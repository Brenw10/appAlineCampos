import React, { useState } from 'react';
import DefaultButton from "../components/DefaultButton";
import { StyleSheet } from 'react-native';
import Section from '../components/Section';
import SelectTime from '../components/SelectTime';
import DateTime from '../services/DateTime';

function SchedulingTime({ setRoute, treatments, date }) {
  const [time, setTime] = useState();

  function goNext() {
    setRoute('SchedulingResult',
      {
        treatments: treatments.filter(value => value.checked),
        datetime: DateTime.Moment(time),
      },
    )
  }

  return (
    <>
      <DefaultButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('SchedulingDate', { treatments })}
      />
      <Section title='Horário da Consulta' />
      <SelectTime onSelectItem={setTime} date={date} />

      <DefaultButton style={styles.nextButton}
        disabled={!time}
        icon='angle-right' text='Avançar'
        onClick={goNext}
      />
    </>
  )
}

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
  nextButton: {
    marginTop: 20,
  },
});

export default SchedulingTime;