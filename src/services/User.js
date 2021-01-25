import Axios from 'axios';
import { API } from '../config/api';

function set(idToken, user) {
  return Axios.post(`${API}/user`, { idToken, user });
}

const service = {
  set,
};

export default service;