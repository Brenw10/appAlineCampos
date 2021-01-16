import React, { useState } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import UserLogin from '../components/UserLogin';
import WelcomeLogin from '../components/WelcomeLogin';

function Login() {
  const [userlogin, setUserLogin] = useState();

  const duration = 300;
  const flexTopAnim = new Animated.Value(0.65);
  const flexBottomAnim = new Animated.Value(0.35);
  const imageSizeAnim = new Animated.Value(200);
  const opacityAnim = new Animated.Value(1);

  function onClickStart() {
    Animated.timing(flexTopAnim, {
      toValue: 0.3,
      duration,
      useNativeDriver: false,
    }).start();
    Animated.timing(flexBottomAnim, {
      toValue: 0.7,
      duration,
      useNativeDriver: false,
    }).start();
    Animated.timing(imageSizeAnim, {
      toValue: 130,
      duration,
      useNativeDriver: false,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start(() => setUserLogin(true));
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.topContainer, flex: flexTopAnim }}>
        <Animated.Image style={{ width: imageSizeAnim, height: imageSizeAnim }} source={require('../assets/ic_launcher_round.png')} />
      </Animated.View>
      <Animated.View style={{ ...styles.bottomContainer, flex: flexBottomAnim }}>
        {
          opacityAnim._value &&
          <Animated.View style={{ flex: 1, opacity: opacityAnim }}>
            <WelcomeLogin onClickStart={() => onClickStart()} />
          </Animated.View>
        }
        {
          userlogin && <UserLogin />
        }
      </Animated.View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01877c',
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 40,
  },
});

export default Login;