import cv2
import torch
import numpy as np


from ..static_data import IMG_H,IMG_W

def preprocess(img:np.ndarray):
    orig_h, orig_w = img.shape[:2]
    img = cv2.resize(img, (IMG_W, IMG_H))
    img = img.astype(np.float32) / 255.0
    img = img.transpose(2, 0, 1)
    img = np.expand_dims(img, axis=0)   
    return img, (orig_w, orig_h)

def postprocess(output, orig_size: tuple):
    output = output[0].transpose(1, 2, 0)                                 
    output = (output * 255).clip(0, 255).astype(np.uint8)
    output = cv2.resize(output, orig_size)           
    return output
