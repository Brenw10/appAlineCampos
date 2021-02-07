import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function DefaultButton(props) {
  const { text, icon, onClick, isLeft, disabled, relativeIcon, color } = props;
  const backgroundColor = props.style && props.style.backgroundColor;

  return (
    <TouchableHighlight
      style={{
        ...styles.button,
        ...props.style,
        backgroundColor: disabled ? 'grey' : backgroundColor ? backgroundColor : '#01877c',
      }}
      onPress={() => onClick()}
      underlayColor='#003834'
      disabled={disabled}
    >
      <View style={styles.container}>
        {
          icon && isLeft &&
          <Icon name={icon}
            size={18}
            color={color ? color : '#FFF'}
            style={{ ...styles.iconLeft, position: relativeIcon ? 'relative' : 'absolute' }} />
        }
        <Text style={{ ...styles.text, color: color ? color : '#FFF' }}>
          {text.toUpperCase()}
        </Text>
        {
          icon && !isLeft &&
          <Icon name={icon}
            size={18}
            color={color ? color : '#FFF'}
            style={styles.iconRight}
            style={{ ...styles.iconRight, position: relativeIcon ? 'relative' : 'absolute' }} />
        }
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
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  iconLeft: {
    left: 10,
  },
  iconRight: {
    right: 10,
  },
});

export default DefaultButton;