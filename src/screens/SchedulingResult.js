import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import CancelButton from '../components/CancelButton';
import DateTime from '../services/DateTime';
import Section from '../components/Section';
import Appointment from '../services/Appointment';

function SchedulingResult({ setRoute, treatments, datetime }) {
  function getEndDateTime() {
    const duration = treatments.reduce((sum, value) => sum + value.duration, 0);
    return DateTime.addDate(datetime, 'minute', duration);
  }

  function getTreatmentTotalPrice() {
    return treatments.reduce((sum, value) => sum + value.price, 0);
  }

  function createAppointment() {
    const obj = {
      datetime,
      treatments: treatments.map(value => value._id),
    };
    const description = 'Sua consulta foi enviada para avaliação, em breve, estará disponível uma atualização...';
    return Appointment.create(obj)
      .then(() => setRoute('Successful', { description }));
  }

  return (
    <ScrollView>
      <Logo
        title='Agendamento de Consulta'
        description='Confime os dados e envie o pedido de consulta para aprovação' />
      <View style={styles.resultsContainer}>
        <Section
          title="Horário da consulta"
        />
        <View style={styles.centered}>
          <Text>{`${DateTime.getDateFormat(datetime)}`}</Text>
          <Text style={styles.underline}>
            {'De: ' + DateTime.getHourFormat(datetime)}
            {' - '}
            {'Até: ' + DateTime.getHourFormat(getEndDateTime())}
          </Text>
        </View>
        <Section
          title="Tratamentos escolhidos"
          description={
            treatments
              .map(value => ` - ${value.name}`)
              .join('\n')
          }
        />
        <Section
          title="Valor total da consulta"
        />
        <View style={styles.centered}>
          <Text style={styles.price}>R$ {getTreatmentTotalPrice()}</Text>
        </View>
      </View>
      <View style={styles.buttonsView}>
        <CancelButton style={styles.cancelButton} relativeIcon={true}
          icon='close' text='Cancelar' isLeft={true}
          onClick={() => setRoute('Actions')}
        />
        <PrimaryButton style={styles.confirmButton} relativeIcon={true}
          icon='check' text='Confirmar'
          onClick={() => createAppointment()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
  buttonsView: {
    marginTop: 15,
    flexDirection: 'row',
  },
  resultsContainer: {
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  cancelButton: {
    flex: 0.5,
    margin: 10,
  },
  confirmButton: {
    flex: 0.5,
    margin: 10,
  },
});

export default SchedulingResult;