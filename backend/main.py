import base64
import io
import json
import os
import tempfile
import urllib.error
import urllib.request
from pathlib import Path
import time


import cv2
from fastapi import FastAPI, File, HTTPException, UploadFile
from PIL import Image


from src.pipeline.image_cleaner import clean_image
from src.static_data import MODEL_PATH,ONNX_MODEL_PATH
from src.utils.utils import load_model
from src.imagekit_conf import imagekit
from src.matrices.matrix_calc import calculate_metrices
from src.classifier.water_classifier import classify_water
from src.schema import (
    HealthResponse,
    MatricesResponse,
    WaterClassificationResponse,
    CleanImageResponse,
    CleanVideoResponse,
)




app = FastAPI()
model = load_model(ONNX_MODEL_PATH)


@app.get("/", response_model=HealthResponse)
def health_check():
    return {"status":"healthy"}

# Matrices
@app.post("/matrices", response_model=MatricesResponse)
async def compute_matrices(raw:UploadFile=File(...), referance:UploadFile=File(...)):
    return await calculate_metrices(raw,referance,model)


# Water classifier
@app.post("/classify-water", response_model=WaterClassificationResponse)
async def water_classifier(file:UploadFile=File):
    image_bytes = await file.read()
    with tempfile.NamedTemporaryFile(delete=False,suffix=".jpg") as temp_file:
        temp_file.write(image_bytes)
        temp_path = str(Path(temp_file.name))
    try:
        water_type = classify_water(temp_path)
        return water_type
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)



# Services


# @app.post("/clean-vid", response_model=CleanVideoResponse)
# async def clean_video(file:UploadFile=File):
#     pass


@app.post("/clean-img", response_model=CleanImageResponse)
async def clean_image(file:UploadFile=File):
    save_path = "processed.jpg"
    image_bytes = await file.read()
    with tempfile.NamedTemporaryFile(delete=False,suffix=".jpg") as temp_file:
        temp_file.write(image_bytes)
        temp_path = str(Path(temp_file.name))
    try:
        t_start = time.perf_counter()
        cleaned_image = clean_image(temp_path,model)
        del_t = time.perf_counter() - t_start
        cv2.imwrite(save_path,cleaned_image)
        with open(save_path,"rb") as f:
            upload_response = imagekit.files.upload(
                file = f,
                file_name = os.path.join("AquaLense",save_path)
            )
        return {
            "status":"successful",
            "time_taken":del_t,
            "url":upload_response.url
        }
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

