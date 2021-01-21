import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import CALENDAR from '../constants/calendar';
import DateTime from '../services/DateTime';

LocaleConfig.defaultLocale = 'pt-BR';

function ClientCalendar() {
	const [items, setItems] = useState({});
	const fake = {
		[DateTime.getDefaultDateFormat(new Date())]: [
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

	useEffect(() => {
		loadItems();
	}, []);

	function loadItems() {
		const dates = DateTime
			.getDaysInNextMonths(DateTime.getMonthStartDate(new Date()), CALENDAR.MAX_MONTH)
			.map(value => ({ [DateTime.getDefaultDateFormat(value)]: [] }))
			.reduce((obj, value) => Object.assign(obj, value), {});
		setItems(dates);
	}

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
				futureScrollRange={CALENDAR.MAX_MONTH}
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