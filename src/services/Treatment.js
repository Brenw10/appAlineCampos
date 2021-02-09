import Axios from 'axios';
import { API } from '../config/Api';

function getAll(accessToken) {
  return Axios.get(`${API}/treatment`,
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

const service = {
  getAll,
};

export default service;