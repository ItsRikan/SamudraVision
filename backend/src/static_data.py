import os
import glob


# Training Data
lr = 0.0005
BATCH_SIZE = 4
IMG_W, IMG_H = 512, 768
ACCUM_STEPS = 4
EPOCHS = 10

DATA_DIR = "data"
MODEL_DIR = "model"

RAW_DATA_DIR = os.path.join(DATA_DIR,"raw-890")
REFERENCE_DATA_DIR = os.path.join(DATA_DIR,"reference-890")
MODEL_PATH = os.path.join(MODEL_DIR,"LSUImodel.pth")
ONNX_MODEL_PATH = os.path.join(MODEL_DIR,"model.onnx")

TRAINING_FILE_PATH = glob.glob("*.*", root_dir=RAW_DATA_DIR)

