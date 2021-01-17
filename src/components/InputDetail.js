import React from 'react';
import { StyleSheet, Text } from 'react-native';

function InputDetail({ text }) {
  return <Text style={styles.text}>{text}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    color: 'grey',
    marginTop: -22,
    marginLeft: 10,
  },
});

export default InputDetail;