import Axios from 'axios';
import { API } from '../config/api';

function set(token, user) {
  return Axios.post(`${API}/user`, { token, user });
}

const service = {
  set,
};

export default service;