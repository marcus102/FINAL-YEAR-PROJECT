import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const PORT = 'http://10.0.2.2:8000';
// const PORT = 'http://10.10.0.231:8000';
const PORT = 'http://172.20.10.6:8000';
// const PORT = 'http://192.168.0.100:8000';
// const PORT = 'http://192.168.0.100:8000';
const assistanceUrl = PORT + '/api/support/assistance/';

export async function sendComplain(email, description, detail) {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${token}`,
  };

  await axios.post(
    assistanceUrl,
    {
      email: email,
      issue_nature: description,
      issue_detail: detail,
    },
    { headers }
  );
}
