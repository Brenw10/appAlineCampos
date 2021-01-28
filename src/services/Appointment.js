import Axios from 'axios';
import { API } from '../config/api';
import { GoogleSignin } from '@react-native-community/google-signin';

async function getAll() {
  const { accessToken } = await GoogleSignin.getTokens();
  return Axios.get(`${API}/appointment`,
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

const service = {
  getAll,
};

export default service;