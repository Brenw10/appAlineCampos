import React, { useLayoutEffect, useState } from 'react';
import PrimaryButton from "../components/PrimaryButton";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import SelectDate from '../components/SelectDate';
import DateTime from '../services/DateTime';
import { CALENDAR } from '../constants/calendar';
import Treatment from '../services/Treatment';

const FIRST_TIME = {
  YES: 'Sim',
  NO: 'Não',
}

function Scheduling({ setRoute }) {
  const [date, setDate] = useState();
  const [treatments, setTreatments] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState();

  useLayoutEffect(() => {
    loadTreatments();
  }, []);

  async function loadTreatments() {
    const { data } = await Treatment.getAll();
    setTreatments(data);
  }

  function onToggleTreatment(value) {
    const newValue = Object.assign(value, { checked: !value.checked });
    setTreatments([...Object.assign(treatments, newValue)]);
  }

  function onButtonGroupPress(firstTime) {
    const checkedValue = value => ({ checked: firstTime === FIRST_TIME.YES ? value.isFirstType : false });
    const newTreatments = [...treatments].map(value => Object.assign(value, checkedValue(value)));
    setTreatments(newTreatments);
    setIsFirstTime(firstTime);
  }

  function renderTreatments() {
    return treatments
      .filter(value => isFirstTime === FIRST_TIME.YES ? value.isFirstType : !value.isFirstType)
      .map((value, i) =>
        <CheckBox key={i}
          title={value.name}
          checked={value.checked}
          disabled={isFirstTime === FIRST_TIME.YES}
          onPress={() => onToggleTreatment(value)}
        />
      );
  }

  return (
    <>
      <PrimaryButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('Actions')}
      />
      <ScrollView>
        <Text style={styles.sectionText}>É sua primeira consulta?</Text>
        <ButtonGroup
          onPress={index => onButtonGroupPress(Object.values(FIRST_TIME)[index])}
          selectedIndex={Object.values(FIRST_TIME).findIndex(value => value === isFirstTime)}
          buttons={Object.values(FIRST_TIME).map(value => value)}
        />

        <Text style={styles.sectionText}>Tratamentos</Text>
        <View>{renderTreatments()}</View>

        <SelectDate date={date}
          setDate={date => setDate(date)}
          message={'Selecione a Data Atendimento'}
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
});

export default Scheduling;