import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function IconButton({ name, onPress }) {
  return (
    <Icon.Button name={name} style={styles.button} size={18}
      onPress={() => onPress && onPress()}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3b5998",
    paddingLeft: 9,
    paddingRight: 0
  },
});

export default IconButton;