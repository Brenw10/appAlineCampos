import { GoogleSignin } from '@react-native-community/google-signin';
import { GOOGLE_AUTH } from '../config/api';

export default GoogleSignin.configure(GOOGLE_AUTH);