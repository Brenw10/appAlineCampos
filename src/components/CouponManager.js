import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Coupon from '../services/Coupon';
import { useAuth } from '../contexts/Auth';
import { ListItem } from 'react-native-elements'
import DefaultButton from './DefaultButton';
import CouponAdd from './CouponAdd';

function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [selected, setSelected] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    loadCoupons();
  }, []);

  async function loadCoupons() {
    const { data } = await Coupon.getAll(token);
    setCoupons(data);
  }

  async function remove() {
    await Coupon.remove(token, selected._id);
    setSelected();
    loadCoupons();
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
      <ScrollView>
        <View style={styles.rowContainer}>
          <DefaultButton style={styles.remove} relativeIcon={true}
            icon='minus' text='Remover' isLeft={true}
            disabled={!selected}
            onClick={() => remove()}
          />
          <DefaultButton style={styles.add} relativeIcon={true}
            icon='plus' text='Adicionar' isLeft={true}
            onClick={() => setIsAdding(true)}
          />
        </View>
        {coupons.map(renderCoupon)}
      </ScrollView>
      <CouponAdd isVisible={isAdding} setVisible={setIsAdding} isCreatedDone={loadCoupons} />
    </>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
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