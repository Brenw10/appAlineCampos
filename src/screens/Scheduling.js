import React, { useState } from 'react';
import PrimaryButton from "../components/PrimaryButton";
import { StyleSheet, Text, View } from 'react-native';
import SCREENS from '../constants/screens';
import { CheckBox } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import IconButton from '../components/IconButton';
import DateTime from '../services/DateTime';

function Scheduling({ onScreenChange }) {
  const [dateTime, setDateTime] = useState();
  const [mode, setMode] = useState();
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      name: "Acupuntura",
    },
    {
      id: 2,
      name: "Massagem Relaxante",
    },
    {
      id: 3,
      name: "Cone Chinês",
    },
    {
      id: 4,
      name: "Ventosaterapia",
    },
  ]);

  function onToggleTreatment(value) {
    const newValue = Object.assign(value, { checked: !value.checked });
    setTreatments([...Object.assign(treatments, newValue)]);
  }

  function onChangeDateTime(selectedDate) {
    setMode(mode === 'date' ? 'time' : null);
    const newDateTime = DateTime.setDateTimeValue(selectedDate || dateTime, 'second', 0);
    setDateTime(newDateTime);
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

  return (
    <>
      <PrimaryButton styles={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => onScreenChange(SCREENS.ACTIONS)}
      />

      <Text style={styles.sectionText}>Tratamentos</Text>
      <View style={styles.treatments}>
        {renderTreatments()}
      </View>

      <View style={styles.calendarContainer}>
        <IconButton name='calendar' onPress={() => setMode('date')} />
        <Text style={styles.calendarDate}>
          {
            dateTime
              ?
              DateTime.getDateTimeFormat(dateTime)
              :
              ' < Selecione Data e Horario de Atendimento'
          }
        </Text>
      </View>
      {
        mode &&
        <DateTimePicker
          mode={mode}
          is24Hour={true}
          value={dateTime || new Date()}
          onChange={(_, selectedDate) => onChangeDateTime(selectedDate)}
        />
      }
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
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  calendarDate: {
    marginLeft: 15,
  }
});

export default Scheduling;