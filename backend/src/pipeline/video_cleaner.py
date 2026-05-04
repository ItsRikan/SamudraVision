import cv2
import torch


from ..imageModel.model import Model
from ..utils.channel_precessors import preprocess,postprocess

def real_time_cleaner(vid_path:str,model:Model,save_path=None):
    captured = cv2.VideoCapture(vid_path)
    if save_path is not None:
        frame_width = int(captured.get(cv2.CAP_PROP_FRAME_WIDTH))
        frame_height = int(captured.get(cv2.CAP_PROP_FRAME_HEIGHT))
        fps = captured.get(cv2.CAP_PROP_FPS)
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(save_path, fourcc, fps, (frame_width, frame_height))
    try:
        while True:
            ret,frame = captured.read()
            if not ret:
                break
            tensor, orig_size = preprocess(frame)
            with torch.no_grad():
                pred,_ = model(tensor)
            result = postprocess(pred, orig_size)
            if show:
                cv2.imshow("frame",result)
                if cv2.waitkey(4) & 0xFF==ord("q"):
                    break
            if save_path is not None:
                out.write(result)
            
            yield result
    except Exception as e:
        print(f"Error : {e}")
    finally:
        if save_path is not None:
            out.release()
        captured.release()
        cv2.destroyAllWindows()