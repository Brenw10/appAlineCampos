import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { CALENDAR } from '../constants/Calendar';
import DateTime from '../services/DateTime';
import Appointment from '../services/Appointment';
import { APPOINTMENT } from '../constants/Appointment';
import Icon from 'react-native-vector-icons/FontAwesome';

LocaleConfig.defaultLocale = 'pt-BR';

function ClientCalendar() {
	const [items, setItems] = useState({});

	useEffect(() => {
		loadItems();
	}, []);

	async function loadItems() {
		const { data } = await Appointment.getAll();
		const dates = getUniqueDates(data);
		const datesPopulated = getDatesPopulated(dates, data);
		const newItems = getDatesItemFormat(datesPopulated);
		setItems(newItems);
	}

	function getUniqueDates(data) {
		return data
			.map(value => DateTime.getDefaultDateFormat(value.datetime))
			.filter((value, index, array) => index === array.findIndex(v => v === value))
	}

	function getDatesPopulated(dates, data) {
		return dates.map(value => ({
			[value]: data.filter(v => DateTime.getDefaultDateFormat(v.datetime) === value)
		}));
	}

	function getDatesItemFormat(data) {
		return data.reduce((obj, value) => Object.assign(obj, value), {});
	}

	function renderItem(item) {
		return (
			<View style={styles.item}>
				<View style={styles.subItem}>
					<View style={{ flex: 1 }}>
						<Text style={styles.hour}>
							{DateTime.getHourFormat(item.datetime)}
							{' - '}
							{DateTime.getHourFormat(DateTime.addDate(item.datetime, 'minute', item.duration))}
						</Text>
						<Text style={styles.patient}>{item.client.name}</Text>
						<Text style={styles.treatments}>{item.treatments.map(value => value.name).join('\n')}</Text>
					</View>
					<Image
						style={styles.image}
						resizeMode='contain'
						source={{
							uri: item.client.photo,
						}}
					/>
				</View>
				<View style={styles.statusContainer}>
					<Icon name={APPOINTMENT[item.status].ICON} size={18} color={APPOINTMENT[item.status].COLOR} />
					<Text style={styles.statusText}>
						{APPOINTMENT[item.status].TEXT}
					</Text>
				</View>
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
		padding: 20,
		margin: 10,
	},
	subItem: {
		flexDirection: 'row',
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
	image: {
		width: 70,
		height: 70,
		borderRadius: 100,
	},
	statusContainer: {
		marginTop: 15,
		alignSelf: 'center',
		flexDirection: 'row',
	},
	statusText: {
		marginLeft: 5,
	},
});

export default ClientCalendar;