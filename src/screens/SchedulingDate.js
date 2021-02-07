import React, { useState } from 'react';
import DefaultButton from "../components/DefaultButton";
import { StyleSheet, View } from 'react-native';
import SelectDate from '../components/SelectDate';
import DateTime from '../services/DateTime';
import { CALENDAR } from '../constants/Calendar';
import Section from '../components/Section';

function SchedulingDate({ setRoute, treatments }) {
  const [date, setDate] = useState();

  return (
    <>
      <DefaultButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('SchedulingTreatment', { treatments })}
      />
      <Section title='Data da Consulta' />
      <View style={styles.centered}>
        <SelectDate date={date}
          setDate={date => setDate(date)}
          message={'Selecione a Data Atendimento'}
          maximumDate={DateTime.addDate(new Date(), 'months', CALENDAR.MAX_MONTH)}
          minimumDate={DateTime.addDate(new Date(), 'day', 1)}
        />
      </View>

      <DefaultButton style={styles.nextButton}
        disabled={!date}
        icon='angle-right' text='Avançar'
        onClick={() => setRoute('SchedulingTime', { treatments, date })}
      />
    </>
  )
}

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
  centered: {
    alignItems: 'center',
  },
  nextButton: {
    marginTop: 20,
  },
});

export default SchedulingDate;