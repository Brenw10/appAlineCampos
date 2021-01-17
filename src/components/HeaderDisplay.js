import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

function HeaderDisplay(props) {
  const duration = useRef(props.duration).current;
  const flexTopAnim = useRef(new Animated.Value(1 - props.flex)).current;
  const flexBottomAnim = useRef(new Animated.Value(props.flex)).current;
  const imageSizeAnim = useRef(new Animated.Value(props.imageSize)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const propsRef = useRef(props);

  useEffect(() => {
    if (props !== propsRef.current) anim();
    propsRef.current = props;
  }, [props.flex, props.imageSize]);

  function anim() {
    Animated.parallel([
      Animated.timing(flexTopAnim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(flexBottomAnim, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (props.onFirstAnimDone) props.onFirstAnimDone();
      Animated.parallel([
        Animated.timing(flexTopAnim, {
          toValue: 1 - props.flex,
          duration,
          delay: duration,
          useNativeDriver: false,
        }),
        Animated.timing(flexBottomAnim, {
          toValue: props.flex,
          duration,
          delay: duration,
          useNativeDriver: false,
        }),
        Animated.timing(imageSizeAnim, {
          toValue: props.imageSize,
          duration,
          delay: duration,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration,
          delay: duration,
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (props.onSecondAnimDone) props.onSecondAnimDone();
      });
    });
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.topContainer, flex: flexTopAnim }}>
        <Animated.Image style={{ width: imageSizeAnim, height: imageSizeAnim }}
          source={require('../assets/logo.png')} resizeMode='contain' />
      </Animated.View>
      <Animated.View style={{ ...styles.bottomContainer, flex: flexBottomAnim }}>
        <Animated.View style={{ flex: 1, opacity: opacityAnim }}>
          {props.children}
        </Animated.View>
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

export default HeaderDisplay;