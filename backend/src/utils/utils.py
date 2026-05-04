import torch
import onnxruntime as ort
from ..imageModel.model import Model

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model(path: str) -> Model:
    session = ort.InferenceSession(
                    path,
                    providers=["CUDAExecutionProvider", "CPUExecutionProvider"]
                )
    return session
