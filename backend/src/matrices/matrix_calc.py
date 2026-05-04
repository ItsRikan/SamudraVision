import os
import tempfile
from pathlib import Path
import time

import cv2
from skimage.metrics import peak_signal_noise_ratio as psnr 
from skimage.metrics import structural_similarity as ssim


from ..pipeline.image_cleaner import clean_image

async def calculate_metrices(raw, referance,model):
    image_bytes_raw = await raw.read()
    image_bytes_ref = await referance.read()
    with tempfile.NamedTemporaryFile(delete=False,suffix=".jpg") as orig:
        orig.write(image_bytes_raw)
        raw_path = str(Path(orig.name))
    with tempfile.NamedTemporaryFile(delete=False,suffix=".jpg") as ref:
        ref.write(image_bytes_ref)
        ref_path = str(Path(ref.name))
    try:
        t_start = time.perf_counter()
        enhanced = clean_image(raw_path,model)
        del_t = time.perf_counter() - t_start
        ref = cv2.imread(ref_path)
        return {
            "TIME":del_t,
            "PSNR"  : psnr(ref, enhanced),
            "SSIM"  : ssim(ref, enhanced, channel_axis=2,data_range=255),
        }
    finally:
        if os.path.exists(raw_path):
            os.remove(raw_path)
        if os.path.exists(ref_path):
            os.remove(ref_path)