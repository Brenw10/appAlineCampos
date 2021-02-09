import { GoogleSignin } from '@react-native-community/google-signin';
import { GOOGLE_AUTH } from '../config/Api';

export default GoogleSignin.configure(GOOGLE_AUTH);