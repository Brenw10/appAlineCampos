import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from './Logo';
import OutlineButton from './OutlineButton';
import PrimaryButton from './PrimaryButton';

function UserLogin() {
  return (
    <View style={{ flex: 1 }}>
      <Logo
        title="Inicio de acesso ao usuário"
        description="Em caso de usuário novo, preencha e clique em registrar"
      />
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
      <View style={styles.actions}>
        <PrimaryButton text="Entrar" />
        <OutlineButton text="Registrar" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actions: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default UserLogin;