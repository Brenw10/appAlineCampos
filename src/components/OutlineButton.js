import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

function OutlineButton({ text, onClick }) {
  return (
    <TouchableHighlight style={styles.button} onPress={() => onClick()}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,

  },
  text: {
    color: '#000',
    fontWeight: '700',
    padding: 10,
  },
});

export default OutlineButton;