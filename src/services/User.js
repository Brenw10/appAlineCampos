import Axios from 'axios';
import { API } from '../config/api';
import { GoogleSignin } from '@react-native-community/google-signin';

async function set(user) {
  const { accessToken } = await GoogleSignin.getTokens();
  return Axios.post(`${API}/user`, { user },
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

const service = {
  set,
};

export default service;