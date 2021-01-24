import Axios from 'axios';
import { API } from '../config/api';

function getByCPF(cpf) {
  return Axios.get(`${API}/user/${cpf}`);
}

function set(user) {
  return Axios.post(`${API}/user`, user);
}

const service = {
  getByCPF,
  set,
}

export default service;