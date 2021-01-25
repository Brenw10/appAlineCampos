import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import SCREENS from '../constants/screens';
import '../services/GoogleAuth';
import UserService from '../services/User';

function UserLogin({ onScreenChange }) {

  async function googleSignIn() {
    return GoogleSignin.signIn()
      .then(user => onScreenChange(SCREENS.ACTIONS, signIn(user)));
  }

  function signIn(userInfo) {
    return function () {
      return UserService
        .set(userInfo.idToken, userInfo.user);
    }
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