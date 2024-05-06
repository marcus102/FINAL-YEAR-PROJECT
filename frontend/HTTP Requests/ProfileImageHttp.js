import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const PORT = 'http://10.0.2.2:8000';
// const PORT = 'http://10.10.0.231:8000';
// const PORT = 'http://172.20.10.6:8000';
const PORT = 'http://192.168.0.100:8000';
// const PORT = 'http://192.168.0.100:8000';

const profileImageUrl = PORT + '/api/images/images/';

export async function addProfileImageRequest(uri) {
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });

  const imgToken = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${imgToken}`,
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  const res = await axios.post(profileImageUrl, formData, { headers });
}

export async function fetchUserProfile() {
  const imgToken = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${imgToken}`,
    accept: 'application/json',
  };

  try {
    const response = await axios.get(profileImageUrl, { headers });

    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(id, uri) {
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });

  const imgToken1 = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${imgToken1}`,
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  const response = await axios.patch(`${profileImageUrl}${id}/`, formData, {
    headers,
  });

  return response.data;
}
