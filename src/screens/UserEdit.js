import React, { useReducer } from 'react';
import { Input } from 'react-native-elements';
import Logo from '../components/Logo';
import OnlyNumber, { ACTIONS } from '../reducers/OnlyNumber';
import DefaultButton from '../components/DefaultButton';
import { useAuth } from '../contexts/Auth';
import UserService from '../services/User';

function UserEdit({ setRoute, user }) {
  const [number, dispatchNumber] = useReducer(OnlyNumber, "");
  const { token } = useAuth();

  function create() {
    return UserService.set(token, { ...user, number })
      .then(() => setRoute('Actions'));
  }

  return (
    <>
      <Logo
        title='Configuração do Usuário'
        description='Digite seu celular de preferencia WhatsApp'
      />
      <Input
        value={number} onChangeText={value => dispatchNumber({ type: ACTIONS.ADD, payload: { value } })}
        placeholder='Ex.: (99) 99999-9999' label="Número de Celular"
        keyboardType='numeric' maxLength={11}
        leftIcon={{ type: 'feather', name: 'smartphone', color: 'grey' }}
      />
      <DefaultButton disabled={number.length !== 11} onClick={create}
        icon='send' text='Enviar'
      />
    </>
  )
}

export default UserEdit;