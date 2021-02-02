import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';

const CONFIG = {
  MARGIN: 40,
};

const STATUS = {
  RESET: 'RESET',
  HIDE: 'HIDE',
  SHOW: 'SHOW',
};

function Navigation(props) {
  const [route, setRoute] = useState(props.initial);
  const [arg, setArg] = useState();
  const [status, setStatus] = useState(STATUS.SHOW);
  const [bottomViewHeight, setBottomViewHeight] = useState();
  const bottomViewTranslateY = useRef(new Animated.Value(0)).current;
  const bottomViewOpacity = useRef(new Animated.Value(1)).current;

  function hideAnim(route, arg) {
    Animated.parallel([
      Animated.timing(bottomViewTranslateY, {
        toValue: bottomViewHeight - CONFIG.MARGIN,
        duration: props.duration,
        useNativeDriver: true,
      }),
      Animated.timing(bottomViewOpacity, {
        toValue: 0,
        duration: props.duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStatus(STATUS.RESET);
      setArg(arg);
      setRoute(route);
    });
  }

  function showAnim(height) {
    setStatus(STATUS.SHOW);
    Animated.sequence([
      Animated.timing(bottomViewTranslateY, {
        toValue: height - CONFIG.MARGIN,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(bottomViewTranslateY, {
          toValue: 0,
          duration: props.duration,
          useNativeDriver: true,
        }),
        Animated.timing(bottomViewOpacity, {
          toValue: 1,
          duration: props.duration,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }

  function getComponent() {
    const array = React.Children.toArray(props.children);
    const component = array.find(child => child.props.route === route);
    return React.cloneElement(component, { ...arg, setRoute: hideAnim });
  }

  function onBottomViewLayout(height) {
    if (status === STATUS.HIDE) showAnim(height);
    if (status === STATUS.RESET) setStatus(STATUS.HIDE);
    setBottomViewHeight(height);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          style={styles.image}
          source={props.image} resizeMode='contain' />
      </View>

      <Animated.View
        style={{
          ...styles.bottomContainer,
          transform: [{ translateY: bottomViewTranslateY }],
          opacity: status === STATUS.HIDE ? 0 : 1,
        }}
        onLayout={event => onBottomViewLayout(event.nativeEvent.layout.height)}>
        <Animated.View style={{ opacity: bottomViewOpacity }}>
          {status !== STATUS.RESET && getComponent()}
        </Animated.View>
      </Animated.View>

      {[STATUS.RESET, STATUS.HIDE].includes(status) && <View style={styles.dummy} />}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01877c',
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 200,
  },
  bottomContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    maxHeight: "85%",
    paddingTop: CONFIG.MARGIN,
  },
  dummy: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingTop: CONFIG.MARGIN,
  },
});

export default Navigation;