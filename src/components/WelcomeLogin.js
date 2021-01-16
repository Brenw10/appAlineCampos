import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PrimaryButton from './PrimaryButton';

function WelcomeLogin({ onClickStart }) {
  return (
    <>
      <Text style={styles.header}>Um jeito fácil de manter regular suas consultas!</Text>
      <Text style={styles.description}>Faça um breve login</Text>
      <View style={styles.startContainer}>
        <PrimaryButton text="Iniciar" onClick={() => onClickStart()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 23,
    color: '#0f2f49',
    fontWeight: '700',
  },
  description: {
    color: '#939394',
  },
  startContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default WelcomeLogin;