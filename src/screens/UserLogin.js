import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import '../services/GoogleAuth';
import UserService from '../services/User';
import { useAuth } from '../contexts/Auth';

function UserLogin({ setRoute, failed }) {
  const { setToken } = useAuth();

  async function googleSignIn() {
    try {
      await clearGoogleCache();
      const { user } = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      const { data } = await UserService.get(accessToken);
      setToken(accessToken);
      if (data.number) {
        await UserService.set(accessToken, { ...user, number: data.number });
        setRoute('Actions');
      } else {
        setRoute('UserEdit', { user });
      }
    } catch {
      setRoute('UserLogin', { failed: true });
    }
  }

  async function clearGoogleCache() {
    if (await GoogleSignin.isSignedIn()) {
      const { accessToken } = await GoogleSignin.getTokens();
      await GoogleSignin.clearCachedAccessToken(accessToken);
    }
  }

  return (
    <View>
      <Logo
        title={failed ? "Ocorreu um erro, tente novamente" : "Area de acesso ao usuário"}
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
    marginTop: '20%',
    width: '100%',
  },
});

export default UserLogin;