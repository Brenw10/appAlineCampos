import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function PrimaryButton(props) {
  const { text, icon, onClick, isLeft, disabled } = props;

  return (
    <TouchableHighlight
      style={{ ...styles.button, ...props.style, backgroundColor: disabled ? 'grey' : '#01877c' }}
      onPress={() => onClick()}
      underlayColor='#003834'
      disabled={disabled}
    >
      <View style={styles.container}>
        {icon && isLeft && <Icon name={icon} size={18} color='#FFF' style={styles.iconLeft} />}
        <Text style={styles.text}>{text.toUpperCase()}</Text>
        {icon && !isLeft && <Icon name={icon} size={18} color='#FFF' style={styles.iconRight} />}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
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
    padding: 10,
  },
  container: {
    flexDirection: 'row',
  },
  text: {
    color: '#FFF',
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: 10,
  },
  iconRight: {
    position: 'absolute',
    right: 10,
  },
});

export default PrimaryButton;