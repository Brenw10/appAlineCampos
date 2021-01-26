import React from 'react';
import { StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import SCREENS from '../constants/screens';

function WelcomeLogin({ onScreenChange }) {
  return (
    <>
      <Logo
        title="Um jeito fácil de manter regular sua saúde!"
        description="Faça um breve login"
      />
      <PrimaryButton style={styles.button}
        text="Iniciar" icon='rocket' onClick={() => onScreenChange(SCREENS.LOGIN)}
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