import Axios from 'axios';
import { API } from '../config/api';
import { GoogleSignin } from '@react-native-community/google-signin';

async function set(user) {
  const { idToken } = await GoogleSignin.getCurrentUser();
  return Axios.post(`${API}/user`, { user }, { headers: { Authorization: idToken } });
}

const service = {
  set,
};

export default service;