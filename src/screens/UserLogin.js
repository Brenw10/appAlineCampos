import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import '../services/GoogleAuth';
import UserService from '../services/User';

function UserLogin({ setRoute }) {

  async function googleSignIn() {
    return GoogleSignin.signIn()
      .then(({ user }) => UserService.set(user))
      .then(() => setRoute('Actions'));
  }

  return (
    <View>
      <Logo
        title="Area de acesso ao usuário"
        description="Entre com sua conta Google"
      />

      <GoogleSigninButton
        style={styles.google}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  google: {
    marginTop: '30%',
    width: '100%',
  },
});

export default UserLogin;