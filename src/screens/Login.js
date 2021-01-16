import React, { useRef } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import UserLogin from '../components/UserLogin';

function Login() {
  const flexAnimTop = useRef(new Animated.Value(0.65)).current;
  const flexAnimBottom = useRef(new Animated.Value(0.35)).current;
  const imageSize = useRef(new Animated.Value(200)).current;

  function onClickStart() {
    Animated.timing(flexAnimTop, {
      toValue: 0.3,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(flexAnimBottom, {
      toValue: 0.7,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(imageSize, {
      toValue: 130,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, flex: flexAnimTop }}>
        <Animated.Image style={{ width: imageSize, height: imageSize }} source={require('../assets/ic_launcher_round.png')} />
      </Animated.View>
      <Animated.View style={{ ...styles.loginContainer, flex: flexAnimBottom }}>
        <UserLogin onClickStart={() => onClickStart()} />
      </Animated.View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01877c',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 40,
  },
});

export default Login;