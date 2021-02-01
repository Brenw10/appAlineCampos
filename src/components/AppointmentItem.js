import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { APPOINTMENT } from '../constants/Appointment';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTime from '../services/DateTime';

function AppointmentItem({ item, disabled, onPress }) {
	return (
		<TouchableOpacity style={styles.item} disabled={disabled} onPress={onPress}>
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
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#FFF',
		padding: 20,
		margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
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
		marginLeft: 5,
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

export default AppointmentItem;