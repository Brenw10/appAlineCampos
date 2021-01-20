import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.defaultLocale = 'pt-BR';

function ClientCalendar() {

	const items = {
		'2021-01-18': [
			{
				startTime: '13:00',
				endTime: '15:00',
				patient: 'Carolina Campos',
				treatments: [
					{
						name: "Acupuntura",
					},
					{
						name: "Massagem Relaxante",
					},
				],
			},
			{
				startTime: '15:30',
				endTime: '17:00',
				patient: 'Brendon Mota',
				treatments: [
					{
						name: "Cone Chinês",
					},
					{
						name: "Massagem Relaxante",
					},
					{
						name: "Tratamento Ultra Secreto Desenvolvido pela Nasa em 1768",
					},
				],
			},
		],
	};

	function renderItem(item) {
		return (
			<View style={styles.item}>
				<Text style={styles.hour}>{`${item.startTime} - ${item.endTime}`}</Text>
				<Text style={styles.patient}>{item.patient}</Text>
				<Text style={styles.treatments}>{item.treatments.map(value => value.name).join('\n')}</Text>
			</View>
		);
	}

	return (
		<>
			<Agenda
				items={items}
				pastScrollRange={0}
				futureScrollRange={6}
				renderItem={item => renderItem(item)}
			/>
		</>
	)
};

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#FFF',
		padding: 10,
		marginRight: 10,
		marginTop: 17,
	},
	hour: {
		color: '#45535e',
	},
	patient: {
		color: '#4b5863',
		fontSize: 15,
		marginTop: 10,
	},
	treatments: {
		marginTop: 10,
		color: '#9caebb',
	},
});

export default ClientCalendar;