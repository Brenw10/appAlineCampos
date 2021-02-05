import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import DefaultButton from '../components/DefaultButton';
import AppointmentDetail from '../components/AppointmentDetail';
import Appointment from '../services/Appointment';
import { useAuth } from '../contexts/Auth';
import { MESSAGE } from '../constants/Appointment';

function SchedulingResult({ setRoute, treatments, datetime }) {
  const { token } = useAuth();

  function createAppointment() {
    const obj = {
      datetime,
      treatments: treatments.map(value => value._id),
    };
    return Appointment.create(token, obj)
      .then(() => setRoute('Successful', { description: MESSAGE.CREATED_APPOINTMENT }));
  }

  return (
    <ScrollView>
      <Logo
        title='Agendamento de Consulta'
        description='Confime os dados e envie o pedido de consulta para aprovação' />
      <AppointmentDetail appointment={{ datetime, treatments }} />
      <View style={styles.buttonsView}>
        <DefaultButton style={styles.cancelButton} relativeIcon={true}
          color='#787878'
          icon='close' text='Cancelar' isLeft={true}
          onClick={() => setRoute('Actions')}
        />
        <DefaultButton style={styles.confirmButton} relativeIcon={true}
          icon='check' text='Confirmar'
          onClick={() => createAppointment()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonsView: {
    marginTop: 15,
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 0.5,
    margin: 10,
    backgroundColor: '#FFF',
  },
  confirmButton: {
    flex: 0.5,
    margin: 10,
  },
});

export default SchedulingResult;