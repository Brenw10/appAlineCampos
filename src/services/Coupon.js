import Axios from 'axios';
import { API } from '../config/api';

function getAll(accessToken) {
  return Axios.get(`${API}/coupon`,
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

function remove(accessToken, _id) {
  return Axios.delete(`${API}/coupon/${_id}`,
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

function create(accessToken, coupon) {
  return Axios.post(`${API}/coupon`, { coupon },
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

function getByName(accessToken, name) {
  return Axios.get(`${API}/coupon/${name}`,
    { headers: { 'Cache-Control': 'no-cache', Authorization: accessToken } }
  );
}

const service = {
  getAll,
  remove,
  create,
  getByName,
};

export default service;