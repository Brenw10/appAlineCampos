import React, { useReducer, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnlyNumbers, { ACTIONS } from '../reducers/OnlyNumber';
import InputDetail from './InputDetail';
import Logo from './Logo';
import PrimaryButton from './PrimaryButton';

function UserLogin() {
  const [cpf, dispatchCPF] = useReducer(OnlyNumbers);
  const [phone, dispatchPhone] = useReducer(OnlyNumbers);
  const [name, setName] = useState();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
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

      <View style={styles.actions}>
        <PrimaryButton text="Entrar" />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default UserLogin;