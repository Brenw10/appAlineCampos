import {
  API_URL,
  ANDROID_CLIENT_ID,
  WEB_CLIENT_ID,
  IOS_CLIENT_ID,
} from "@env";

export const API = API_URL;

export const GOOGLE_AUTH = {
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
};