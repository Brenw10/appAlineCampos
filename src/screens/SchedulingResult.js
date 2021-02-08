import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import DefaultButton from '../components/DefaultButton';
import AppointmentDetail from '../components/AppointmentDetail';
import Appointment from '../services/Appointment';
import { useAuth } from '../contexts/Auth';
import { MESSAGE } from '../constants/Appointment';
import { Input } from 'react-native-elements';
import IconButton from '../components/IconButton';
import Coupon from '../services/Coupon';

function SchedulingResult({ setRoute, treatments, datetime }) {
  const [coupon, setCoupon] = useState();
  const [validCoupon, setValidCoupon] = useState();
  const { token } = useAuth();

  function createAppointment() {
    const obj = {
      datetime,
      treatments: treatments.map(value => value._id),
      coupon: coupon.name,
    };
    return Appointment.create(token, obj)
      .then(() => setRoute('Successful', { description: MESSAGE.CREATED_APPOINTMENT }));
  }

  async function getCoupon() {
    const { data } = await Coupon.getByName(token, coupon);
    setValidCoupon(data || false);
  }

  return (
    <ScrollView>
      <Logo
        title='Agendamento de Consulta'
        description='Confime os dados e envie o pedido de consulta para aprovação' />
      <AppointmentDetail appointment={{ datetime, treatments }} coupon={validCoupon} showDetail={true} />
      <View style={styles.rowContainer}>
        <Input containerStyle={styles.coupon}
          value={coupon} onChangeText={value => setCoupon(value)}
          placeholder='Digite o cupom' label="Cupom"
          leftIcon={{ type: 'font-awesome', name: 'tag', color: 'grey' }}
          errorMessage={validCoupon !== undefined ? validCoupon ? 'Cupom Válido' : 'Cupom Inválido' : ''}
          errorStyle={{ color: validCoupon ? 'green' : 'red' }}
        />
        <IconButton name='check' onPress={getCoupon} />
      </View>
      <View style={styles.rowContainer}>
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  coupon: {
    marginTop: 15,
    flex: 1,
  },
});

export default SchedulingResult;