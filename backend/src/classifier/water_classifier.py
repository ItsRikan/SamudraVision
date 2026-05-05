import cv2
import numpy as np



def classify_water(img_path):
    img = cv2.imread(img_path)
    b, g, r = cv2.split(img)
    b_mean = np.mean(b)
    g_mean = np.mean(g)
    r_mean = np.mean(r)
    max_color = 255
    if b_mean > g_mean * 1.2:
        confidence = b_mean / max_color
        return {"wtype": "Deep Blue Ocean", "score": float(confidence.item())}
    elif g_mean > r_mean * 1.1:
        confidence = g_mean / max_color
        return {"wtype": "Coastal/Turbid", "score": float(confidence.item())}
    else:
        b_g_ratio = b_mean / max_color if g_mean > 0 else 0
        g_r_ratio = g_mean / max_color if r_mean > 0 else 0
        confidence = np.max([b_g_ratio, g_r_ratio, 1.0])  
        return {"wtype": "Mixed/Shallow", "score": float(confidence.item())}