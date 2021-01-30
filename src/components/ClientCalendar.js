import React, { useEffect, useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { CALENDAR } from '../constants/Calendar';
import DateTime from '../services/DateTime';
import Appointment from '../services/Appointment';
import User from '../services/User';
import AppointmentItem from './AppointmentItem';

LocaleConfig.defaultLocale = 'pt-BR';

function ClientCalendar() {
	const [user, setUser] = useState();
	const [items, setItems] = useState({});

	useEffect(() => {
		load();
	}, []);

	async function load() {
		const currentUser = await User.get();
		const appointments = await Appointment.getAll();
		const newItems = getItems(appointments.data);
		setUser(currentUser.data);
		setItems(newItems);
	}

	function getItems(data) {
		const dates = getUniqueDates(data);
		const datesPopulated = getDatesPopulated(dates, data);
		return getDatesItemFormat(datesPopulated);
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

	function showModal() {
		console.log('Modal Here');
	}

	return (
		<>
			<Agenda
				items={items}
				pastScrollRange={0}
				futureScrollRange={CALENDAR.MAX_MONTH}
				renderItem={item =>
					<AppointmentItem item={item} disabled={!user.admin} onPress={() => showModal()} />
				}
			/>
		</>
	)
};

export default ClientCalendar;