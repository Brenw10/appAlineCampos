import React, { useEffect, useReducer, useState } from 'react';
import { View } from 'react-native';
import DefaultButton from './DefaultButton';
import { Input } from 'react-native-elements';
import DefaultModal from './DefaultModal';
import Section from './Section';
import Coupon from '../services/Coupon';
import { useAuth } from '../contexts/Auth';
import OnlyNumber, { ACTIONS as ONLYNUMBER } from '../reducers/OnlyNumber';

function CouponAdd({ isVisible, setVisible, isCreatedDone }) {
  const [name, setName] = useState();
  const [value, dispatchValue] = useReducer(OnlyNumber, "");
  const { token } = useAuth();

  useEffect(() => {
    setName();
    dispatchValue({ type: ONLYNUMBER.CLEAR });
  }, [isVisible]);

  async function create() {
    await Coupon.create(token, { name, value });
    isCreatedDone();
    setVisible(false);
  }

  return (
    <>
      <DefaultModal isModalVisible={isVisible} setIsModalVisible={setVisible}>
        <Section title='Novo Cupom' />
        <View>
          <Input
            value={name}
            onChangeText={value => setName(value)}
            autoCapitalize='characters' autoCompleteType='off'
            placeholder='Digite o cupom' label="Cupom"
            leftIcon={{ type: 'font-awesome', name: 'tag', color: 'grey' }}
          />
          <Input
            value={value} onChangeText={value => dispatchValue({ type: ONLYNUMBER.ADD, payload: { value } })}
            placeholder='Digite o valor do cupom' label="Valor"
            keyboardType='numeric'
            leftIcon={{ type: 'font-awesome', name: 'credit-card', color: 'grey' }}
          />
          <DefaultButton onClick={create}
            disabled={!name || !value}
            icon='check' text='Adicionar' isLeft={true}
          />
        </View>
      </DefaultModal>
    </>
  );
}

export default CouponAdd;