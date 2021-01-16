import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './src/services/CalendarConfig.js';

function App() {
	const Stack = createStackNavigator();
	useEffect(() => {
		SplashScreen.hide();
	});
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
