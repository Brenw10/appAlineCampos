import Moment from 'moment';

Moment.locale('pt-BR');

function setDateTimeValue(dateTime, field, value) {
  return new Date(Moment(dateTime).set(field, value));
}

function getDateTimeFormat(dateTime) {
  return Moment(dateTime).format('DD/MM/YYYY HH:mm');
}

const service = {
  getDateTimeFormat,
  setDateTimeValue,
};

export default service;