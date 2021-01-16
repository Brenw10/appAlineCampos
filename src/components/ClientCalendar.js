import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.defaultLocale = 'pt-BR';

function ClientCalendar() {
	return (
		<>
			<CalendarList
				pastScrollRange={0}
				futureScrollRange={12}
			/>
		</>
	)
};

export default ClientCalendar;