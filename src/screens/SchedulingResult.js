import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import DateTime from '../services/DateTime';
import Section from '../components/Section';

function SchedulingResult({ setRoute, treatments, datetime }) {
  function getEndDateTime() {
    const duration = treatments.reduce((sum, value) => sum + value.duration, 0);
    return DateTime.addDate(datetime, 'minute', duration);
  }

  function getTreatmentTotalPrice() {
    return treatments.reduce((sum, value) => sum + value.price, 0);
  }

  return (
    <ScrollView>
      <Logo
        title='Agendamento de Consulta'
        description='Confime os dados e envie o pedido de consulta para aprovação' />
      <Section
        title="Horário da consulta"
      />
      <View style={styles.datetimeContainer}>
        <Text>{`${DateTime.getDateFormat(datetime)}`}</Text>
        <Text>
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
        description={'R$ ' + getTreatmentTotalPrice()}
      />
      <View style={styles.buttonsView}>
        <PrimaryButton
          icon='close' text='Cancelar' isLeft={true}
          onClick={() => setRoute('Actions')}
        />
        <PrimaryButton
          icon='check' text='Enviar Consulta'
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  datetimeContainer: {
    alignItems: 'center',
  },
  buttonsView: {
    marginTop: 15,
  },
});

export default SchedulingResult;