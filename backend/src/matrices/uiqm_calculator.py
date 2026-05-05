import numpy as np
import cv2

def compute_uiqm(img_bgr):
    img = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB).astype(np.float32) / 255.0
    r, g, b = img[:,:,0], img[:,:,1], img[:,:,2]

    rg = r - g
    yb = 0.5*(r + g) - b
    uicm = -0.0268 * np.sqrt(np.mean(rg)**2 + np.mean(yb)**2) + \
            0.1586 * np.sqrt(np.std(rg)**2  + np.std(yb)**2)

    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    sobel = cv2.Sobel(gray, cv2.CV_64F, 1, 1)
    uism = np.mean(np.abs(sobel))

    uiconm = np.log(np.std(gray) + 1e-8)

    return 0.0282*uicm + 0.2953*uism + 3.5753*uiconm


def compute_uciqe(img_bgr):
    lab = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2LAB).astype(np.float32)
    l, a, b = lab[:,:,0], lab[:,:,1], lab[:,:,2]
    chroma  = np.sqrt(a**2 + b**2)
    return 0.4680*np.std(chroma) + 0.2745*np.mean(l) + 0.2576*np.std(l)