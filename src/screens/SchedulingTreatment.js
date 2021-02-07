import React, { useEffect, useState } from 'react';
import DefaultButton from "../components/DefaultButton";
import { ScrollView, StyleSheet } from 'react-native';
import Treatment from '../services/Treatment';
import Treatments from '../components/Treatments';
import { useAuth } from '../contexts/Auth';

function SchedulingTreatment(props) {
  const [treatments, setTreatments] = useState(props.treatments || []);
  const { token } = useAuth();

  useEffect(() => {
    if (!treatments.length) loadTreatments();
  }, []);

  async function loadTreatments() {
    const { data } = await Treatment.getAll(token);
    setTreatments(data);
  }

  function onToggleTreatment(value) {
    const newValue = Object.assign(value, { checked: !value.checked });
    setTreatments([...Object.assign(treatments, newValue)]);
  }

  return (
    <>
      <DefaultButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => props.setRoute('Actions')}
      />
      <ScrollView>
        <Treatments
          onToggleTreatment={onToggleTreatment}
          treatments={treatments}
        />

        <DefaultButton style={styles.nextButton}
          disabled={!treatments.find(value => value.checked)}
          icon='angle-right' text='Avançar'
          onClick={() => props.setRoute('SchedulingDate', { treatments })}
        />
      </ScrollView>
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

export default SchedulingTreatment;