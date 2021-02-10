import DateTime from './DateTime';

function getEndDateTime(datetime, treatments) {
  const duration = treatments.reduce((sum, value) => sum + value.duration, 0);
  return DateTime.addDate(datetime, 'minute', duration);
}

function getTreatmentTotalPrice(treatments) {
  return treatments.reduce((sum, value) => sum + value.price, 0);
}

const service = {
  getEndDateTime,
  getTreatmentTotalPrice,
};

export default service;