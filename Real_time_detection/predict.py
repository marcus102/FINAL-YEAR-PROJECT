from ultralytics import YOLO
import cv2
import numpy as np
import argparse
import supervision as sv

# # Load a pretrained YOLOv8n model
# model = YOLO('yolov8l.pt')
# # model.eval()

# #IMAGE PREDICT
# # Define path to the image file
# source = 'images/alek-burley-iK6Jx5bU2pk-unsplash.jpg'

# # Run inference on the source
# results = model(source)  # list of Results objects
##############################################################################################

# #VIDEO PREDICT
# # Define path to video file
# source = "D:/Youtube/The 10 Businesses That Will Create Africa's Next Billionaires....mp4"

# # Run inference on the source
# results = model(source, stream=True)  # generator of Results objects

#############################################################################################

# REAL TIME DETECTION

ZONE_POLYGONE = np.array([
    [0, 0],
    [0.5, 0],
    [0.5, 1],
    [0, 1]
])

def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='YOLOV8')
    parser.add_argument(
        '--webcam-resolution', 
        default=[1280, 720], 
        nargs=2, 
        type=int
    )

    args = parser.parse_args()
    return args

def main():

    args = parse_arguments()
    frame_width, frame_height = args.webcam_resolution
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, frame_width)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, frame_height)

    model = YOLO('yolov8n.pt')

    box_annotator = sv.BoxAnnotator(
        thickness=2,
        text_thickness=2,
        text_scale=1
    )

    zone_polygone = (ZONE_POLYGONE * np.array(args.webcam_resolution)).astype(int)
    zone = sv.PolygonZone(polygon=zone_polygone, frame_resolution_wh=tuple(args.webcam_resolution))
    zone_annotator = sv.PolygonZoneAnnotator(zone=zone, color=sv.Color.RED, thickness=2, text_thickness=4, text_scale=2)

    while True:
        ret, frame = cap.read()

        result = model(frame, agnostic_nms=True)[0]

        detections = sv.Detections.from_ultralytics(result)
        # detections = detections[detections.class_id != 0]

        # print(detections)

        labels = [
            f"{model.model.names[class_id]} {confidence:0.2f}"
            for _, _, confidence, class_id, _, _
            in detections   
        ]
        frame = box_annotator.annotate(
            scene=frame, 
            detections=detections, 
            labels=labels
        )

        zone.trigger(detections=detections)
        frame = zone_annotator.annotate(scene=frame)
        cv2.imshow('yolov8', frame)

        # print(frame.shape)
        # break

        if(cv2.waitKey(30) == 27 ):
            break

if __name__ == '__main__':
    main()