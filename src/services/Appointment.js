import Axios from 'axios';
import { API } from '../config/api';
import DateTime from './DateTime';
import PushNotification from "react-native-push-notification";
import { CHANNEL } from '../config/Notification';
import { MESSAGE } from '../constants/Appointment';

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

function getEndDateTime(datetime, treatments) {
  const duration = treatments.reduce((sum, value) => sum + value.duration, 0);
  return DateTime.addDate(datetime, 'minute', duration);
}

function getTreatmentTotalPrice(treatments) {
  return treatments.reduce((sum, value) => sum + value.price, 0);
}

function newAppointmentNotification(date) {
  PushNotification.localNotificationSchedule({
    ...CHANNEL,
    message: MESSAGE.ALERT_APPOINTMENT,
    date: DateTime.subtractDate(date, 'day', 1),
  });
}

const service = {
  getAll,
  create,
  getEndDateTime,
  getTreatmentTotalPrice,
  setStatus,
  getFreeTime,
  newAppointmentNotification,
};

export default service;