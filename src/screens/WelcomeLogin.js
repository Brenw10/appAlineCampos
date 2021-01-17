import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';

function WelcomeLogin({ onClickStart }) {
  return (
    <>
      <Logo
        title="Um jeito fácil de manter regular sua saúde!"
        description="Faça um breve login"
      />
      <View style={styles.startContainer}>
        <PrimaryButton text="Iniciar" icon='rocket' onClick={() => onClickStart()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default WelcomeLogin;