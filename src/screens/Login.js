import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/ic_launcher_round.png')} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.header}>Um jeito fácil de manter regular suas consultas!</Text>
        <Text style={styles.description}>Faça um breve login</Text>
        <View style={styles.startContainer}>
          <TouchableHighlight style={styles.start}>
            <Text style={styles.startText}>Iniciar</Text>
          </TouchableHighlight></View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01877c',
    flex: 1,
  },
  logoContainer: {
    flex: 0.65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 0.35,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 40,
  },
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
  start: {
    backgroundColor: '#01877c',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  startText: {
    color: '#FFF',
    fontWeight: '700',
    padding: 10,
  },
});

export default Login;