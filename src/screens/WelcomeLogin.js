import React from 'react';
import { StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';

function WelcomeLogin({ setRoute }) {
  return (
    <>
      <Logo
        title="Um jeito fácil de manter regular sua saúde!"
        description="Faça um breve login"
      />
      <PrimaryButton style={styles.button}
        text="Iniciar" icon='rocket' onClick={() => setRoute('UserLogin')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: '30%',
  },
});

export default WelcomeLogin;