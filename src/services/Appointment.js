import Axios from 'axios';
import { API } from '../config/Api';

function getAll(accessToken) {
  return Axios.get(`${API}/appointment`,
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

function create(accessToken, appointment) {
  return Axios.post(`${API}/appointment`, { appointment },
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

function setStatus(accessToken, id, status) {
  return Axios.put(`${API}/appointment/${id}/status`, { status },
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

function getFreeTime(accessToken, date) {
  return Axios.get(`${API}/appointment/freetime`,
    {
      params: { date },
      headers: { 'Cache-Control': 'no-cache', Authorization: accessToken }
    }
  );
}

const service = {
  getAll,
  create,
  setStatus,
  getFreeTime,
};

export default service;