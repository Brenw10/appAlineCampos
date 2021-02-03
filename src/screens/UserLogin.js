import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import '../services/GoogleAuth';
import UserService from '../services/User';
import { useAuth } from '../contexts/Auth';

function UserLogin({ setRoute }) {
  const { setToken } = useAuth();

  async function googleSignIn() {
    if (await GoogleSignin.isSignedIn()) {
      const { accessToken } = await GoogleSignin.getTokens();
      await GoogleSignin.clearCachedAccessToken(accessToken);
    }
    const { user } = await GoogleSignin.signIn();
    const { accessToken } = await GoogleSignin.getTokens();
    setToken(accessToken);
    await UserService.set(accessToken, user);
    setRoute('Actions');
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