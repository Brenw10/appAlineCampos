import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

function PrimaryButton({ text, onClick }) {
  return (
    <TouchableHighlight style={styles.button} onPress={() => onClick()}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
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
    marginTop: 5,
    marginBottom: 5,
  },
  text: {
    color: '#FFF',
    fontWeight: '700',
    padding: 10,
  },
});

export default PrimaryButton;