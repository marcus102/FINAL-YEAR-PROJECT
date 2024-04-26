import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//10.0.2.2
//Default
// const PORT = 'http://10.0.2.2:8000';
// const PORT2 = 'http://10.0.2.2:5000';

// const PORT = 'http://10.10.0.231:8000';
// const PORT2 = 'http://10.10.0.231:5000';

const PORT = 'http://172.20.10.6:8000';
const PORT2 = 'http://172.20.10.6:5000';

// const PORT = 'http://192.168.0.100:8000';
// const PORT2 = 'http://192.168.0.100:5000';

//SOFT
// const PORT = 'http://192.168.0.100:8000';
// const PORT2 = 'http://192.168.0.100:5000';

const requestUrl = PORT2 + '/api/predict/';
const predictInfoUrl = PORT + '/api/predictions/predictions/';

async function HeaderHandler() {
  const imgToken = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${imgToken}`,
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  return headers;
}

export async function ImageRecognition(uri) {
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });

  const headers = await HeaderHandler();

  const res = await axios.post(requestUrl, formData, { headers });

  return res;
}

export async function UploadPredictionImage(uri) {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    const headers = await HeaderHandler();
    const response = await axios.post(predictInfoUrl, formData, { headers });
    return response.data;
  } catch (error) {
    throw error.message;
  }
}

export async function UploadPrediction(id, parameter, option) {
  try {
    let choiceTitle;
    let choiceData;

    if (option === 'prediction') {
      choiceTitle = 'prediction';
      choiceData = parameter;
    } else if (option === 'favorite') {
      choiceTitle = 'favorites';
      choiceData = parameter;
    } else if (option === 'like') {
      choiceTitle = 'likes';
      choiceData = parameter;
    } else if (option === 'status') {
      choiceTitle = 'status';
      choiceData = parameter;
    } else if (option === 'user_experience') {
      choiceTitle = 'user_experience';
      choiceData = parameter;
    }

    const headers = await HeaderHandler();

    const data = {
      [choiceTitle]: choiceData,
    };

    await axios.patch(`${predictInfoUrl}${id}/`, data, { headers });
  } catch (error) {
    throw error.message;
  }
}

export async function FetchPrediction() {
  try {
    const headers = await HeaderHandler();
    const response = await axios.get(predictInfoUrl, { headers });
    return response.data;
  } catch (error) {
    throw error.message;
  }
}

export async function DeletePrediction(id) {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${token}`,
  };
  await axios.delete(`${predictInfoUrl}${id}/`, { headers });
}
