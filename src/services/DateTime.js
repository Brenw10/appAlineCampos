import Moment from 'moment';

Moment.locale('pt-BR');

function getDateTimeFormat(date) {
  return Moment(date).format('DD/MM/YYYY HH:mm');
}

function getDateFormat(date) {
  return Moment(date).format('DD/MM/YYYY');
}

function addDate(date, field, value) {
  return new Date(Moment(date).add(value, field));
}

const service = {
  getDateTimeFormat,
  getDateFormat,
  addDate,
};

export default service;