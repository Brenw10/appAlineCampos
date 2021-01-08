import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.defaultLocale = 'pt-BR';

const ClientCalendar: () => React$Node = () => {
	return (
		<>
			<CalendarList
				pastScrollRange={0}
				futureScrollRange={12}
				scrollEnabled={true}
				showScrollIndicator={true}
			/>
		</>
	)
};

export default ClientCalendar;