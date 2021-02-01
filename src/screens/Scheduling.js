import React, { useEffect, useState } from 'react';
import DefaultButton from "../components/DefaultButton";
import { ScrollView, StyleSheet, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import SelectDate from '../components/SelectDate';
import DateTime from '../services/DateTime';
import { CALENDAR } from '../constants/Calendar';
import Treatment from '../services/Treatment';
import Treatments from '../components/Treatments';
import Section from '../components/Section';
import SelectTime from '../components/SelectTime';

function Scheduling({ setRoute }) {
  const [date, setDate] = useState();
  const [treatments, setTreatments] = useState([]);
  const [time, setTime] = useState();

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

  function goToResults() {
    const datetimeString = DateTime.getDefaultDateFormat(date) + ' ' + DateTime.getHourFormat(time);
    const datetime = DateTime.Moment(datetimeString);
    setRoute('SchedulingResult', {
      treatments: treatments.filter(value => value.checked),
      datetime,
    });
  }

  function isValidToResults() {
    return treatments.find(value => value.checked) && date && time;
  }

  return (
    <>
      <DefaultButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('Actions')}
      />
      <ScrollView>
        {
          <>
            <Treatments
              onToggleTreatment={onToggleTreatment}
              treatments={treatments}
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

            <Section title='Horário da Consulta' />
            <SelectTime onSelectItem={setTime} />

            <DefaultButton style={styles.nextButton}
              disabled={!isValidToResults()}
              icon='angle-right' text='Avançar'
              onClick={goToResults}
            />
          </>
        }
      </ScrollView>
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

export default Scheduling;