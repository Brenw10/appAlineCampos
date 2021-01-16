import React, { useReducer } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnlyNumbers, { ACTIONS } from '../reducers/OnlyNumber';
import InputDetail from './InputDetail';
import Logo from './Logo';
import PrimaryButton from './PrimaryButton';

function UserLogin() {
  const [cpf, dispatchCPF] = useReducer(OnlyNumbers);
  const [phone, dispatchPhone] = useReducer(OnlyNumbers);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
      <Logo
        title="Inicio de acesso ao usuário"
        description="Em caso de usuário novo, preencha e clique em registrar"
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
      <InputDetail text="Somente números"/>
      <Input
        placeholder='Celular'
        keyboardType='numeric'
        value={phone}
        onChangeText={value => dispatchPhone({ type: ACTIONS.ADD, payload: { value } })}
        maxLength={9}
        leftIcon={
          <Icon
            name='phone'
            size={18}
            color='#86939e'
          />
        }
      />
      <InputDetail text="DDD + Número"/>
      
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