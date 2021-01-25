import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import CALENDAR from '../constants/calendar';
import DateTime from '../services/DateTime';
import Appointment from '../services/Appointment';

LocaleConfig.defaultLocale = 'pt-BR';

function ClientCalendar() {
	const [items, setItems] = useState({});

	useEffect(() => {
		loadItems();
	}, []);

	function getMergedItems(data) {
		return function (value) {
			return {
				[DateTime.getDefaultDateFormat(value)]:
					data.filter(item =>
						DateTime.getDefaultDateFormat(item.datetime) === DateTime.getDefaultDateFormat(value)
					)
			}
		}
	}

	async function loadItems() {
		const { data } = await Appointment.getAll();
		const newItems = DateTime
			.getDaysInNextMonths(DateTime.getMonthStartDate(new Date()), CALENDAR.MAX_MONTH)
			.map(getMergedItems(data))
			.reduce((obj, value) => Object.assign(obj, value), {});
		setItems(newItems);
	}

	function renderItem(item) {
		return (
			<View style={styles.item}>
				<Text style={styles.hour}>
					{DateTime.getHourFormat(item.datetime)}
					{' - '}
					{DateTime.getHourFormat(DateTime.addDate(item.datetime, 'minute', item.duration))}
				</Text>
				<Text style={styles.patient}>{item.client.name}</Text>
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