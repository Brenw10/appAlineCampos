import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

function UserLogin(props) {
  return (
    <>
      <Text style={styles.header}>Um jeito fácil de manter regular suas consultas!</Text>
      <Text style={styles.description}>Faça um breve login</Text>
      <View style={styles.startContainer}>
        <TouchableHighlight style={styles.start} onPress={() => props.onClickStart()}>
          <Text style={styles.startText}>Iniciar</Text>
        </TouchableHighlight></View>
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

export default UserLogin;