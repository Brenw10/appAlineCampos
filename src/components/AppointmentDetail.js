import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Section from './Section';
import DateTime from '../services/DateTime';
import AppointmentManager from '../services/AppointmentManager';

function AppointmentDetail({ appointment, coupon }) {

  return (
    <View style={styles.container}>
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
              AppointmentManager.getEndDateTime(appointment.datetime, appointment.treatments)
            )
          }
        </Text>
      </View>
      <Section
        title="Tratamentos escolhidos"
        description={
          appointment.treatments
            .map(value => ` - ${value.name} (${value.duration}min) - R$ ${value.price}`)
            .join('\n')
        }
      />
      {
        coupon &&
        <>
          <Section
            title="Desconto de Cupom"
          />
          <View style={styles.centered}>
            <Text>R$ {coupon.value} - {coupon.name}</Text>
          </View>
        </>
      }
      <Section
        title="Valor total da consulta"
      />
      <View style={styles.centered}>
        <Text style={styles.price}>
          R$ {
            Math.max(
              0,
              AppointmentManager.getTreatmentTotalPrice(appointment.treatments) - (coupon ? coupon.value : 0)
            )
          }
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    padding: 20,
    paddingTop: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
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