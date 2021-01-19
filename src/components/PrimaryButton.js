import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function PrimaryButton({ text, icon, onClick }) {
  return (
    <TouchableHighlight style={styles.button} onPress={() => onClick()}>
      <View style={styles.container}>
        <Text style={styles.text}>{text.toUpperCase()}</Text>
        {icon && <Icon name={icon} size={18} color='#FFF' style={styles.icon} />}
      </View>
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
  icon: {
    position: 'absolute',
    right: 10,
  },
});

export default PrimaryButton;