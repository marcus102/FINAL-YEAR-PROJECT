import { useContext, useEffect } from 'react';

import { ManagmentSystem } from '../store/AppGeneralManagmentSystem';
import { UploadPrediction } from '../HTTP Requests/ImageRecognition';

export default function Interpreter() {
  const dataContext = useContext(ManagmentSystem);
  const labels = dataContext.imageOutput;

  // Count total objects and unique objects
  const totalObjects = labels.length;
  const uniqueObjects = [...new Set(labels)];

  // Count occurrences of each unique object
  const objectCounts = {};
  labels.forEach((obj) => {
    objectCounts[obj] = (objectCounts[obj] || 0) + 1;
  });

  // Generate summary
  const summary = `Object(s) identified in total ${totalObjects}: ${uniqueObjects.map((obj) => `${objectCounts[obj]} ${obj}`).join(', ')}`;

  useEffect(() => {
    const uploadPredictionAsync = async () => {
      try {
        await UploadPrediction(dataContext.predictionId, summary, 'prediction');
      } catch (error) {
        throw error.message;
      }
    };

    uploadPredictionAsync();
  }, [dataContext.predictionId, summary]);

  return summary;
}
