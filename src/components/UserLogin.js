import React from 'react';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import OutlineButton from './OutlineButton';
import PrimaryButton from './PrimaryButton';

function UserLogin() {
  return (
    <>
      <Input
        placeholder='Email'
        leftIcon={
          <Icon
            name='envelope'
            size={18}
            color='#86939e'
          />
        }
      />
      <Input
        placeholder='Senha'
        leftIcon={
          <Icon
            name='lock'
            size={18}
            color='#86939e'
          />
        }
      />
      <PrimaryButton text="Entrar" />
      <OutlineButton text="Registrar" />
    </>
  )
}

export default UserLogin;