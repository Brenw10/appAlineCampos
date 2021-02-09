import React from 'react';
import { StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import DefaultButton from '../components/DefaultButton';

function WelcomeLogin({ setRoute }) {
  return (
    <>
      <Logo
        title="Praticidade em manter sua saúde!"
        description="Faça um breve login"
      />
      <DefaultButton style={styles.button}
        text="Iniciar" icon='rocket' onClick={() => setRoute('UserLogin')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: '20%',
  },
});

export default WelcomeLogin;