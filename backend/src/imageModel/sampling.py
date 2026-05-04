import cv2
import torch
from torch import nn
import numpy as np
import sys
import os
from ..static_data import *
from .model import Model
from ..utils.utils import load_model
from ..utils.channel_precessors import preprocess,postprocess

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def clean_image(image_path: str, model: Model, save_path: str = None):
    print(f"Processing: {image_path}")
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Could not read image: {image_path}")
    tensor, orig_size = preprocess(img)

    with torch.no_grad():
        pred, _ = model(tensor)

    result = postprocess(pred, orig_size)

    
    original = cv2.imread(image_path)
    original = cv2.resize(original, orig_size)
    comparison = np.concatenate([original, result], axis=1)

    
    cv2.putText(comparison, "Original",  (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
    cv2.putText(comparison, "Cleaned",   (orig_size[0] + 10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255,   0), 2)

   
    if save_path:
        cv2.imwrite(save_path, result)
        print(f"Cleaned image saved to '{save_path}'")

    
    cv2.imshow("Underwater Image Cleaner — press any key to close", comparison)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    return result



if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:  python inference.py <image_path> [save_path]")
        print("Example: python inference.py underwater.png cleaned.png")
        sys.exit(1)

    image_path = sys.argv[1]
    save_path  = sys.argv[2] if len(sys.argv) > 2 else None

    model  = load_model(MODEL_PATH)
    result = clean_image(image_path, model, save_path)