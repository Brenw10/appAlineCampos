import DateTime from './DateTime';
import PushNotification from "react-native-push-notification";
import { CHANNEL } from '../config/Notification';
import { MESSAGE } from '../constants/Appointment';

function onCreation(date) {
  PushNotification.localNotificationSchedule({
    ...CHANNEL,
    message: MESSAGE.ALERT_APPOINTMENT,
    date: new Date(DateTime.Moment(DateTime.subtractDate(date, 'day', 1)).startOf('day')),
  });
}

const service = {
  onCreation,
};

export default service;