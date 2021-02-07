import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Coupon from '../services/Coupon';
import { useAuth } from '../contexts/Auth';
import { ListItem } from 'react-native-elements'
import DefaultButton from './DefaultButton';

function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [selected, setSelected] = useState();
  const { token } = useAuth();

  useEffect(() => {
    loadCoupons();
  }, []);

  async function loadCoupons() {
    const { data } = await Coupon.getAll(token);
    setCoupons(data);
  }

  function renderCoupon(value) {
    return (
      <ListItem key={value._id}>
        <ListItem.CheckBox checked={selected === value}
          onIconPress={() => setSelected(value)} />
        <TouchableOpacity onPress={() => setSelected(value)}>
          <ListItem.Content>
            <ListItem.Title>{value.name}</ListItem.Title>
            <ListItem.Subtitle>R$ {value.value}</ListItem.Subtitle>
          </ListItem.Content>
        </TouchableOpacity>
      </ListItem>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        {coupons.map(renderCoupon)}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <DefaultButton style={styles.remove} relativeIcon={true}
          icon='close' text='Remover' isLeft={true}
          onClick={() => setAppointmentStatus(APPOINTMENT.REJECTED)}
        />
        <DefaultButton style={styles.add} relativeIcon={true}
          icon='close' text='Adicionar' isLeft={true}
          onClick={() => setAppointmentStatus(APPOINTMENT.REJECTED)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  add: {
    flex: 1,
    marginLeft: 5,
  },
  remove: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#c71441',
  },
});

export default CouponManager;