import React, { useEffect, useReducer, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnlyNumbers, { ACTIONS } from '../reducers/OnlyNumber';
import InputDetail from '../components/InputDetail';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import SCREENS from '../constants/screens';
import UserService from '../services/User';

const MAX_LENGTH = {
  NAME: 50,
  CPF: 11,
  PHONE: 11,
}

function UserLogin({ onScreenChange }) {
  const [cpf, dispatchCPF] = useReducer(OnlyNumbers, "");
  const [phone, dispatchPhone] = useReducer(OnlyNumbers, "");
  const [name, setName] = useState("");

  useEffect(() => {
    if (cpf.length === MAX_LENGTH.CPF)
      UserService.getByCPF(cpf).then(({ data }) => data && fillUser(data));
  }, [cpf]);

  function fillUser(user) {
    setName(user.name);
    dispatchPhone({ type: ACTIONS.ADD, payload: { value: user.phone } });
  }

  function isValid() {
    return cpf.length === MAX_LENGTH.CPF && phone.length === MAX_LENGTH.PHONE && name.length > 0;
  }

  function setUser() {
    return UserService.set({ cpf, phone, name });
  }

  return (
    <ScrollView>
      <Logo
        title="Inicio de acesso ao usuário"
        description="Digite seus dados"
      />

      <Input
        placeholder='CPF'
        keyboardType='numeric'
        maxLength={MAX_LENGTH.CPF}
        value={cpf}
        onChangeText={value => dispatchCPF({ type: ACTIONS.ADD, payload: { value } })}
        leftIcon={
          <Icon
            name='id-card'
            size={18}
            color='#86939e'
          />
        }
      />
      <InputDetail text="Somente números" />

      <Input
        placeholder='Nome'
        value={name}
        onChangeText={value => setName(value)}
        maxLength={MAX_LENGTH.NAME}
        leftIcon={
          <Icon
            name='user'
            size={18}
            color='#86939e'
          />
        }
      />
      <InputDetail text="Nome Completo" />

      <Input
        placeholder='Celular'
        keyboardType='numeric'
        value={phone}
        onChangeText={value => dispatchPhone({ type: ACTIONS.ADD, payload: { value } })}
        maxLength={MAX_LENGTH.PHONE}
        leftIcon={
          <Icon
            name='phone'
            size={18}
            color='#86939e'
          />
        }
      />
      <InputDetail text="DDD + Número" />

      <PrimaryButton style={styles.button} disabled={!isValid()}
        text="Entrar" icon='paper-plane' onClick={() => onScreenChange(SCREENS.ACTIONS, setUser)}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: '30%',
  },
});

export default UserLogin;