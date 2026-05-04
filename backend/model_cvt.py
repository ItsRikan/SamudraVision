import torch
import os
from src.imageModel.model import Model  # import your model class
from src.static_data import ONNX_MODEL_PATH,MODEL_PATH

# Load your trained model
model = Model()
model.load_state_dict(torch.load(MODEL_PATH, map_location="cuda"))
model.eval()

dummy_input = torch.randn(1, 3, 768, 512)

torch.onnx.export(
    model,
    dummy_input,
    ONNX_MODEL_PATH,
    opset_version=17,
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch"}, "output": {0: "batch"}}
)
print("Exported successfully")
