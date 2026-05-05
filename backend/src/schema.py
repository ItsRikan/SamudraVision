from typing import Optional
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str


class MatricesResponse(BaseModel):
    TIME: float
    UIQM: float
    UCIQE: float
    PSNR: Optional[float] = None
    SSIM: Optional[float] = None


class WaterClassificationResponse(BaseModel):
    wtype: str
    score: float



class CleanImageResponse(BaseModel):
    status: str
    time_taken: float
    url: str


# class CleanVideoResponse(BaseModel):
#     status: str
#     time_taken: float
#     url: str