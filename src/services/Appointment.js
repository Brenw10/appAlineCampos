import Axios from 'axios';
import { API } from '../config/api';
import { GoogleSignin } from '@react-native-community/google-signin';
import DateTime from './DateTime';

async function getAll() {
  const { accessToken } = await GoogleSignin.getTokens();
  return Axios.get(`${API}/appointment`,
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

async function create(appointment) {
  const { accessToken } = await GoogleSignin.getTokens();
  return Axios.post(`${API}/appointment`, { appointment },
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

async function setStatus(id, status) {
  const { accessToken } = await GoogleSignin.getTokens();
  return Axios.put(`${API}/appointment/${id}/status`, { status },
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

function getEndDateTime(datetime, treatments) {
  const duration = treatments.reduce((sum, value) => sum + value.duration, 0);
  return DateTime.addDate(datetime, 'minute', duration);
}

function getTreatmentTotalPrice(treatments) {
  return treatments.reduce((sum, value) => sum + value.price, 0);
}

const service = {
  getAll,
  create,
  getEndDateTime,
  getTreatmentTotalPrice,
  setStatus,
};

export default service;