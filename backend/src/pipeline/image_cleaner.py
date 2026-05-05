import cv2
import torch
import onnxruntime as ort
import numpy as np

from ..imageModel.model import Model
from ..utils.channel_precessors import preprocess,postprocess


def clean_image(image_path: str, model):
    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Could not read image: {image_path}")
    img, orig_size = preprocess(img)
    output = model.run(["output"], {"input": img})[0]
    result = postprocess(output, orig_size)
    return result   