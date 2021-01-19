import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function IconButton({ name, disabled, onPress }) {
  return (
    <Icon.Button name={name}
      style={{ ...styles.button, backgroundColor: disabled ? 'grey' : "#3b5998" }}
      size={18}
      disabled={disabled}
      onPress={() => onPress && onPress()}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 9,
    paddingRight: 0
  },
});

export default IconButton;