import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import RequestLoader from './src/components/RequestLoader';
import Routes from './src/screens/Routes';
import './src/services/CalendarConfig.js';

function App() {
	useEffect(() => {
		SplashScreen.hide();
	});

	return (
		<>
			<Routes />
			<RequestLoader />
		</>
	);
};

export default App;
