import cv2
import torch
import os
import glob
import numpy as np
import gc

from model import Model
from ..static_data import *


os.environ["PYTORCH_ALLOC_CONF"] = "expandable_segments:True"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {DEVICE}")
if DEVICE.type == "cuda":
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"Total VRAM: {torch.cuda.get_device_properties(0).total_memory / 1e9:.2f} GB")
print(f"Total Training data : {len(TRAINING_FILE_PATH)}")



def load_data(i=0):
    path     = os.path.join(RAW_DATA_DIR,       TRAINING_FILE_PATH[i])
    ref_path = os.path.join(REFERENCE_DATA_DIR, TRAINING_FILE_PATH[i])

    raw = cv2.imread(path)
    raw = cv2.resize(raw, (IMG_W, IMG_H))
    raw = torch.tensor(raw, dtype=torch.float32).permute(2, 0, 1) / 255.0

    processed = cv2.imread(ref_path)
    processed = cv2.resize(processed, (IMG_W, IMG_H))
    processed = torch.tensor(processed, dtype=torch.float32).permute(2, 0, 1) / 255.0

    return raw, processed


def load_bulk_data(indices: list):
    raws, targets = [], []
    for i in indices:
        raw, proc = load_data(i)
        raws.append(raw)
        if proc is not None:
            targets.append(proc)
    raw_out    = torch.stack(raws).to(DEVICE)
    target_out = torch.stack(targets).to(DEVICE) if targets else None
    return raw_out, target_out





def load_model(path: str) -> Model:
    model = Model()
    state = torch.load(path, map_location=DEVICE)
    model.load_state_dict(state)
    model.eval()
    print(f"Model loaded from '{path}'")
    return model

model     = load_model(MODEL_PATH).to(DEVICE)
optimizer = torch.optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-2)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=EPOCHS)
scaler    = torch.amp.GradScaler('cuda', enabled=(DEVICE.type == "cuda"))

total_params = sum(p.numel() for p in model.parameters()) / 1e6
print(f"Model parameters: {total_params:.2f}M")

model.train()
optimizer.zero_grad(set_to_none=True)
indices = np.arange(0, len(TRAINING_FILE_PATH) - 1).tolist()
current_idx = 0
for epoch in range(EPOCHS):
    epoch_loss = 0.0

    for step in range(ACCUM_STEPS):
        batch_indices = indices[current_idx:(current_idx+BATCH_SIZE)]
        if len(batch_indices)<BATCH_SIZE:
            continue
        current_idx += BATCH_SIZE
        raw, target = load_bulk_data(batch_indices)

        with torch.amp.autocast('cuda', enabled=(DEVICE.type == "cuda")):
            pred, loss = model(raw, target)
            loss = loss / ACCUM_STEPS

        scaler.scale(loss).backward()
        epoch_loss += loss.item()

        del raw, target, pred, loss
        gc.collect()
        torch.cuda.empty_cache()

    scaler.step(optimizer)
    scaler.update()
    optimizer.zero_grad(set_to_none=True)
    scheduler.step()
    if epoch%5==0:
        used = torch.cuda.memory_allocated() / 1e9 if DEVICE.type == "cuda" else 0
        print(f"Epoch {epoch+1}/{EPOCHS}  loss: {epoch_loss:.6f}  "
              f"VRAM: {used:.2f} GB  LR: {scheduler.get_last_lr()[0]:.6f}")


torch.save(model.state_dict(), TUNED_MODEL_PATH)
print(f"Training complete. Model saved to {TUNED_MODEL_PATH}")