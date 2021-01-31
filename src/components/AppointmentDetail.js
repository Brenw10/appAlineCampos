import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Section from './Section';
import DateTime from '../services/DateTime';
import Appointment from '../services/Appointment';

function AppointmentDetail({ appointment }) {
  return (
    <>
      <View style={styles.centered}>
        <Section
          title="Horário da consulta"
        />
        <Text>{`${DateTime.getDateFormat(appointment.datetime)}`}</Text>
        <Text style={styles.underline}>
          {'De: ' + DateTime.getHourFormat(appointment.datetime)}
          {' - '}
          {'Até: ' +
            DateTime.getHourFormat(
              Appointment.getEndDateTime(appointment.datetime, appointment.treatments)
            )
          }
        </Text>
      </View>
      <Section
        title="Tratamentos escolhidos"
        description={
          appointment.treatments
            .map(value => ` - ${value.name}`)
            .join('\n')
        }
      />
      <Section
        title="Valor total da consulta"
      />
      <View style={styles.centered}>
        <Text style={styles.price}>R$ {Appointment.getTreatmentTotalPrice(appointment.treatments)}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppointmentDetail;