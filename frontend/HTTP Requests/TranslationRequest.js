import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const PORT = 'http://192.168.43.124:8000';
// const PORT = 'http://10.0.2.2:8000';
// const PORT = 'http://10.10.0.231:8000';
// const PORT = 'http://172.20.10.6:8000';
const PORT = 'http://192.168.0.100:8000';

const translateUrl = PORT + '/api/translation/translate/';

export async function TranslateText(original_language, chosen_language, original_text) {
  const imgToken = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${imgToken}`,
    accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  const res = await axios.post(
    translateUrl,
    {
      original_language: original_language,
      chosen_language: chosen_language,
      original_text: original_text,
    },
    { headers }
  );
  return res.data;
}
