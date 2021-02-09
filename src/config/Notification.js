import PushNotification from "react-native-push-notification";

export const CHANNEL = {
  channelId: "com.appAlineCampos",
  channelName: "Aline Campos",
  color: '#01877c',
};

export const createChannel = () => PushNotification.createChannel(CHANNEL);