import React, { useEffect, useState } from 'react';
import PrimaryButton from "../components/PrimaryButton";
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import SelectDate from '../components/SelectDate';
import DateTime from '../services/DateTime';
import { CALENDAR } from '../constants/Calendar';
import Treatment from '../services/Treatment';
import Treatments from '../components/Treatments';
import Section from '../components/Section';

const FIRST_TIME = {
  YES: 'Sim',
  NO: 'Não',
}

function Scheduling({ setRoute }) {
  const [date, setDate] = useState();
  const [treatments, setTreatments] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState();

  useEffect(() => {
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

  return (
    <>
      <PrimaryButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('Actions')}
      />
      <ScrollView>
        <Section title='É sua primeira consulta?' />
        <ButtonGroup
          onPress={index => onButtonGroupPress(Object.values(FIRST_TIME)[index])}
          selectedIndex={Object.values(FIRST_TIME).findIndex(value => value === isFirstTime)}
          buttons={Object.values(FIRST_TIME).map(value => value)}
        />

        {
          isFirstTime &&
          <>
            <Section title='Tratamentos' />
            <Treatments
              onToggleTreatment={onToggleTreatment}
              treatments={treatments}
              isFirstTime={isFirstTime === FIRST_TIME.YES}
            />
          </>
        }

        {
          treatments.find(value => value.checked) &&
          <SelectDate date={date}
            setDate={date => setDate(date)}
            message={'Selecione a Data Atendimento'}
            maximumDate={DateTime.addDate(new Date(), 'months', CALENDAR.MAX_MONTH)}
            minimumDate={DateTime.addDate(new Date(), 'day', 1)}
          />
        }
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
});

export default Scheduling;