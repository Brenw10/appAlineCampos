import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import DateTime from '../services/DateTime';

function SchedulingResult({ setRoute, treatments, datetime }) {
  return (
    <>
      <Logo
        title='Agendamento de Consulta'
        description='Confime os dados e envie o pedido de consulta para aprovação' />
      <Text>{treatments.map(value => value.name).join('\n')}</Text>
      <Text>{DateTime.getDateTimeFormat(datetime)}</Text>
      <View style={styles.buttonsView}>
        <PrimaryButton
          icon='close' text='Cancelar' isLeft={true}
          onClick={() => setRoute('Actions')}
        />
        <PrimaryButton
          icon='check' text='Enviar Consulta'
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonsView: {

  }
});

export default SchedulingResult;