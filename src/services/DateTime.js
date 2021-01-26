import Moment from 'moment';

Moment.locale('pt-BR');

function getDefaultDateFormat(date) {
  return Moment(date).format('YYYY-MM-DD');
}

function getDateFormat(date) {
  return Moment(date).format('DD/MM/YYYY');
}

function getHourFormat(date) {
  return Moment(date).format('HH:mm');
}

function addDate(date, field, value) {
  return new Date(Moment(date).add(value, field));
}

const service = {
  getDateFormat,
  addDate,
  getDefaultDateFormat,
  getHourFormat,
};

export default service;