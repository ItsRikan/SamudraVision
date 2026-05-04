from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


class MatricesResponse(BaseModel):
    TIME: float
    PSNR: float
    SSIM: float


class WaterClassificationResponse(BaseModel):
    class_: str
    confidence: float

    class Config:
        fields = {"class_": "class"}


class CleanImageResponse(BaseModel):
    status: str
    time_taken: float
    url: str


# class CleanVideoResponse(BaseModel):
#     status: str
#     time_taken: float
#     url: str