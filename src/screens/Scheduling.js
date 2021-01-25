import React, { useState } from 'react';
import PrimaryButton from "../components/PrimaryButton";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SCREENS from '../constants/screens';
import { CheckBox } from 'react-native-elements'
import SelectDate from '../components/SelectDate';
import DateTime from '../services/DateTime';
import CALENDAR from '../constants/calendar';

function Scheduling({ onScreenChange }) {
  const [date, setDate] = useState();
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      name: "Avaliação",
      minutes: 60,
    },
    {
      id: 2,
      name: "Acupuntura",
      minutes: 60,
    },
    {
      id: 3,
      name: "Massagem Relaxante",
      minutes: 60,
    },
    {
      id: 4,
      name: "Cone Chinês",
      minutes: 60,
    },
    {
      id: 5,
      name: "Ventosaterapia",
      minutes: 60,
    },
    {
      id: 6,
      name: "Auriculoterapia",
      minutes: 60,
    },
    {
      id: 7,
      name: "Recovery",
      minutes: 60,
    },
  ]);

  function onToggleTreatment(value) {
    const newValue = Object.assign(value, { checked: !value.checked });
    setTreatments([...Object.assign(treatments, newValue)]);
  }

  function renderTreatments() {
    return treatments.map((value, i) =>
      <CheckBox key={i}
        title={value.name}
        checked={value.checked}
        onPress={() => onToggleTreatment(value)}
      />
    );
  }

  const disabled = !treatments.find(value => value.checked);
  return (
    <>
      <PrimaryButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => onScreenChange(SCREENS.ACTIONS)}
      />
      <ScrollView>
        <Text style={styles.sectionText}>Tratamentos</Text>
        <View style={styles.treatments}>{renderTreatments()}</View>
        <SelectDate date={date}
          disabled={disabled}
          setDate={date => setDate(date)}
          message={disabled ? 'Antes Selecione um Tratamento' : 'Selecione a Data Atendimento'}
          maximumDate={DateTime.addDate(new Date(), 'months', CALENDAR.MAX_MONTH)}
          minimumDate={DateTime.addDate(new Date(), 'day', 1)}
        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
  sectionText: {
    textAlign: 'center',
    margin: 15,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  treatments: {
    marginBottom: 20,
  },
});

export default Scheduling;