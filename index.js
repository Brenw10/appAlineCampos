/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { createChannel } from './src/config/Notification';

AppRegistry.registerComponent(appName, () => App);

createChannel();