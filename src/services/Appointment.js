import Axios from 'axios';
import { API } from '../config/api';
import { GoogleSignin } from '@react-native-community/google-signin';

async function getAll() {
  const { idToken } = await GoogleSignin.getCurrentUser();
  return Axios.get(`${API}/appointment`, { headers: { Authorization: idToken } });
}

const service = {
  getAll,
};

export default service;