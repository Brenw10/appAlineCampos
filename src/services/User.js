import Axios from 'axios';
import { API } from '../config/api';

function set(accessToken, user) {
  return Axios.post(`${API}/user`, { user },
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

function get(accessToken) {
  return Axios.get(`${API}/user`,
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

const service = {
  set,
  get,
};

export default service;