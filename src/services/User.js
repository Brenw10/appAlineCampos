import Axios from 'axios';
import { API } from '../config/api';

function getByCPF(cpf) {
  return Axios.get(`${API}/user/${cpf}`);
}

const service = {
  getByCPF,
}

export default service;