import os
import tempfile
from pathlib import Path
import time

import cv2
from skimage.metrics import peak_signal_noise_ratio as psnr 
from skimage.metrics import structural_similarity as ssim


from ..pipeline.image_cleaner import clean_image
from .uiqm_calculator import compute_uciqe,compute_uiqm

async def calculate_metrices(raw, referance, model):
    image_bytes_raw = await raw.read()
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as orig:
        orig.write(image_bytes_raw)
        raw_path = str(Path(orig.name))
        
    ref_path = None
    if referance is not None:
        try:
            image_bytes_ref = await referance.read()
            if image_bytes_ref:
                with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as ref_file:
                    ref_file.write(image_bytes_ref)
                    ref_path = str(Path(ref_file.name))
        except Exception:
            ref_path = None

    try:
        t_start = time.perf_counter()
        enhanced = clean_image(raw_path, model)
        del_t = time.perf_counter() - t_start
        
        metrices = {
            "UIQM": float(compute_uiqm(enhanced)),
            "UCIQE": float(compute_uciqe(enhanced)),
            "TIME": float(del_t)
        }
        
        if ref_path is not None:
            ref_img = cv2.imread(ref_path)
            if ref_img is not None:
                # Ensure same size for PSNR/SSIM
                if ref_img.shape != enhanced.shape:
                    ref_img = cv2.resize(ref_img, (enhanced.shape[1], enhanced.shape[0]))
                
                metrices["PSNR"] = float(psnr(ref_img, enhanced))
                ssim_val = ssim(ref_img, enhanced, channel_axis=2, data_range=255)
                metrices["SSIM"] = float(ssim_val)
                
        return metrices
    finally:
        if os.path.exists(raw_path):
            os.remove(raw_path)
        if ref_path and os.path.exists(ref_path):
            os.remove(ref_path)