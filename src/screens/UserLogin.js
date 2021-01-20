import React, { useReducer, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnlyNumbers, { ACTIONS } from '../reducers/OnlyNumber';
import InputDetail from '../components/InputDetail';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import SCREENS from '../constants/screens';

function UserLogin({ onScreenChange }) {
  const [cpf, dispatchCPF] = useReducer(OnlyNumbers);
  const [phone, dispatchPhone] = useReducer(OnlyNumbers);
  const [name, setName] = useState();

  return (
    <ScrollView>
      <Logo
        title="Inicio de acesso ao usuário"
        description="Digite seus dados"
      />

      <Input
        placeholder='CPF'
        keyboardType='numeric'
        maxLength={11}
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
        maxLength={50}
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
        maxLength={11}
        leftIcon={
          <Icon
            name='phone'
            size={18}
            color='#86939e'
          />
        }
      />
      <InputDetail text="DDD + Número" />

      <PrimaryButton style={styles.button}
        text="Entrar" icon='paper-plane' onClick={() => onScreenChange(SCREENS.ACTIONS)}
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