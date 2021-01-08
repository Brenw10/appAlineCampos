import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import ClientCalendar from './src/components/ClientCalendar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './src/services/CalendarConfig.js';

const App: () => React$Node = () => {
	const Stack = createStackNavigator();
	useEffect(() => {
		SplashScreen.hide();
	});
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="ClientCalendar" component={ClientCalendar}
						options={{
							title: 'Agendamento de Consulta',
							headerStyle: {
								backgroundColor: '#14b55a',
							},
							headerTintColor: '#fff',
							headerTitleStyle: {
								fontWeight: 'bold',
							},
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
