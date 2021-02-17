import React, { useEffect, useReducer, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import DefaultButton from '../components/DefaultButton';
import AppointmentDetail from '../components/AppointmentDetail';
import Appointment from '../services/Appointment';
import AppointmentNotification from '../services/AppointmentNotification';
import { useAuth } from '../contexts/Auth';
import { MESSAGE } from '../constants/Appointment';
import { Input } from 'react-native-elements';
import IconButton from '../components/IconButton';
import Coupon from '../services/Coupon';
import User from '../services/User';
import UpperCase, { ACTIONS } from '../reducers/UpperCase';

function SchedulingResult({ setRoute, treatments, datetime }) {
  const [coupon, dispatchCoupon] = useReducer(UpperCase, "");
  const [validCoupon, setValidCoupon] = useState();
  const [isUsingCoupon, setIsUsingCoupon] = useState();
  const [user, setUser] = useState();
  const { token } = useAuth();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await User.get(token);
    setUser(data);
  }

  function createAppointment() {
    const obj = {
      datetime,
      treatments: treatments.map(value => value._id),
      coupon: validCoupon && validCoupon.name,
    };
    return Appointment.create(token, obj)
      .then(() => AppointmentNotification.onCreation(datetime))
      .then(() => setRoute('Successful', { description: MESSAGE.CREATED_APPOINTMENT }));
  }

  async function getCoupon() {
    const { data } = await Coupon.getByName(token, coupon);
    if (data) setValidCoupon(data);
    setIsUsingCoupon(true);
  }

  return (
    <ScrollView>
      <Logo
        title='Agendamento de Consulta'
        description='Confime os dados e envie o pedido de consulta para aprovação' />
      <AppointmentDetail
        appointment={{ datetime, treatments }}
        coupon={validCoupon}
        isAdmin={user && user.admin} />
      <View style={styles.rowContainer}>
        <Input containerStyle={styles.coupon}
          value={coupon} onChangeText={value => dispatchCoupon({ type: ACTIONS.ADD, payload: { value } })}
          placeholder='Digite o cupom' label="Cupom"
          leftIcon={{ type: 'font-awesome', name: 'tag', color: 'grey' }}
          errorMessage={isUsingCoupon ? (validCoupon ? 'Cupom Válido' : 'Cupom Inválido') : ''}
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