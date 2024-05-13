from ultralytics import YOLO
import torch

# print(torch.cuda.set_device(0))

print('Device count', torch.cuda.device_count())
print(torch.cuda.get_device_name(0))
print(torch.cuda.is_available())

device = "0" if torch.cuda.is_available() else "cpu"
if device == "0":
    torch.cuda.set_device(0)

print('device', device)

