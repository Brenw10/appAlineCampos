import React from 'react';
import { StyleSheet } from 'react-native';
import DefaultButton from '../components/DefaultButton';
import CouponManager from '../components/CouponManager';

function Coupon({ setRoute }) {
  return (
    <>
      <DefaultButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('Actions')}
      />

      <CouponManager />
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
});

export default Coupon;