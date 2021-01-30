import React, { useEffect, useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { CALENDAR } from '../constants/Calendar';
import DateTime from '../services/DateTime';
import Appointment from '../services/Appointment';
import AppointmentItem from './AppointmentItem';

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

	return (
		<>
			<Agenda
				items={items}
				pastScrollRange={0}
				futureScrollRange={CALENDAR.MAX_MONTH}
				renderItem={item => <AppointmentItem item={item} />}
			/>
		</>
	)
};

export default ClientCalendar;