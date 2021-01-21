import Moment from 'moment';

Moment.locale('pt-BR');

function getDateTimeFormat(date) {
  return Moment(date).format('DD/MM/YYYY HH:mm');
}

function getDefaultDateFormat(date) {
  return Moment(date).format('YYYY-MM-DD');
}

function getDateFormat(date) {
  return Moment(date).format('DD/MM/YYYY');
}

function addDate(date, field, value) {
  return new Date(Moment(date).add(value, field));
}

function getLastDateFromNextMonths(months) {
  return Moment().set('month', months).endOf('month');
}

function getMonthStartDate(date) {
  return Moment(date).startOf('month');
}

function getDaysInNextMonths(date, months) {
  const lastDate = getLastDateFromNextMonths(months);
  const index = Moment(lastDate).diff(date, 'days') + 1;
  return [...Array(index).keys()].map(value => addDate(date, 'day', value));
}

const service = {
  getDateTimeFormat,
  getDateFormat,
  addDate,
  getDaysInNextMonths,
  getDefaultDateFormat,
  getMonthStartDate,
};

export default service;