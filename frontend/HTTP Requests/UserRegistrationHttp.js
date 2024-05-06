import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//10.0.2.2

// const PORT = 'http://10.0.2.2:8000';
// const PORT = 'http://192.168.0.100:8000';
// const PORT = 'http://10.10.0.231:8000';
// const PORT = 'http://172.20.10.6:8000';
const PORT = 'http://192.168.0.100:8000';

const createUserUrl = PORT + '/api/user/create/';
const loginUrl = PORT + '/api/user/token/';
const codeComfirmationUrl = PORT + '/api/user/confirm_code/';
const codeConfirmationMessageUrl = PORT + '/api/user/send_confirmation_code/';
const getUserInfoUrl = PORT + '/api/user/me/';
const deleteUserUrl = PORT + '/api/user/delete/';
const updateUserUrl = PORT + '/api/user/me/';
const updatePasswordUrl = PORT + '/api/user/update_password/';
const deleteAccountFeedUrl = PORT + '/api/user/delete_account_feed/';

export async function createUser(surname, last_name, username, date_of_birth, email, phone_number, gender, country, password) {
  const response = await axios.post(createUserUrl, {
    email: email,
    username: username,
    password: password,
    surname: surname,
    last_name: last_name,
    phone_number: phone_number,
    date_of_birth: date_of_birth,
    gender: gender,
    country: country,
  });
  return response;
}

export async function logInUser(email, password) {
  const response = await axios.post(loginUrl, {
    email: email,
    password: password,
  });
  return response.data;
}

export async function confirmationMessage(phone_number) {
  const token0 = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${token0}`,
  };
  const response = await axios.patch(
    codeConfirmationMessageUrl,
    {
      phone_number: phone_number,
    },
    { headers }
  );
  return response;
}

export async function confirmationCode(confirmation_code) {
  const token_c = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${token_c}`,
  };

  const response = await axios.patch(
    codeComfirmationUrl,
    {
      confirmation_code: confirmation_code,
    },
    { headers }
  );
  return response;
}

export async function fetchUserInfo(tokenData) {
  let token = '';
  const token_1 = await AsyncStorage.getItem('token');
  if (!tokenData) {
    token = token_1;
  } else {
    token = tokenData;
  }
  const headers = {
    Authorization: `Token ${token}`,
  };

  const response = await axios.get(getUserInfoUrl, { headers });
  return response.data;
}

export async function deleteUser() {
  const token1 = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${token1}`,
  };
  await axios.patch(
    updateUserUrl,
    {
      user_status: 'Inactive',
    },
    { headers }
  );
}

export async function updateUser(surname, last_name, username, date_of_birth, email, phone_number, gender, country) {
  const token2 = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${token2}`,
  };
  const response = await axios.patch(
    updateUserUrl,
    {
      surname: surname,
      last_name: last_name,
      username: username,
      date_of_birth: date_of_birth,
      email: email,
      phone_number: phone_number,
      gender: gender,
      country: country,
    },
    { headers }
  );
  return response;
}

export async function updatePassword(password) {
  const token3 = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${token3}`,
  };
  const response = await axios.patch(
    updatePasswordUrl,
    {
      password: password,
    },
    { headers }
  );
  return response;
}

export async function deleteAccountFeed(feed) {
  const token4 = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Token ${token4}`,
  };
  const response = await axios.post(
    deleteAccountFeedUrl,
    {
      reason: feed,
    },
    { headers }
  );
  return response;
}
