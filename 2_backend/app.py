from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
import supervision as sv

app = Flask(__name__)

# Load YOLOv8 model
model = YOLO('yolov8x.pt')

# ZONE_POLYGONE and other configurations
# ...


@app.route('/api/predict/', methods=['GET', 'POST'])
def predict():
    if request.method == 'GET':
        # Handle GET request logic here
        return jsonify({'message': 'This is a GET request'})

    elif request.method == 'POST':
        # Handle POST request logic here
        image_file = request.files.get('image')
        if not image_file:
            return jsonify({'error': 'No image provided'}), 400

        image = cv2.imdecode(np.frombuffer(
            image_file.read(), np.uint8), cv2.IMREAD_COLOR)
        result = model(image, agnostic_nms=True)[0]
        detections = sv.Detections.from_ultralytics(result)
        labels = [
            f"{model.model.names[class_id]} {confidence:0.2f}"
            for _, _, confidence, class_id, _, _
            in detections
        ]

        return jsonify({'labels': labels})

    else:
        # Method Not Allowed
        return jsonify({'error': 'Unsupported method'}), 405


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
