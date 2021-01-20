import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

const CONSTANT = {
  MARGIN: 40,
  FULLSCREEN: 'FULLSCREEN',
  CALCULATED: 'CALCULATED',
};

function Navigation(props) {
  const propsRef = useRef(props);
  const translateY = useRef(new Animated.Value(0));
  const opacity = useRef(new Animated.Value(1));
  const imageHeight = useRef(new Animated.Value(getImageHeight()));
  const imageTranslateY = useRef(new Animated.Value(0));
  const [height, setHeight] = useState();
  const [topViewHeight, setTopViewHeight] = useState();
  const [dummy, setDummy] = useState();
  const [init, setInit] = useState();

  useEffect(() => {
    if (props.children !== propsRef.current.children) hideAnim();
    props.current = props;
  }, [props.children]);

  useEffect(() => {
    if (height && dummy) displayScreen();
  }, [height]);


  useEffect(() => {
    if (!init && topViewHeight) {
      imageTranslateY.current = new Animated.Value(getImageTranslateY(CONSTANT.CALCULATED));
      setInit(true);
    }
  }, [topViewHeight]);

  function hideAnim() {
    Animated.parallel([
      Animated.timing(translateY.current, {
        toValue: height - CONSTANT.MARGIN,
        duration: props.duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity.current, {
        toValue: 0,
        duration: props.duration,
        useNativeDriver: true,
      }),
      Animated.timing(imageHeight.current, {
        toValue: getMaxImageSize(),
        duration: props.duration,
        useNativeDriver: false,
      }),
      Animated.timing(imageTranslateY.current, {
        toValue: getImageTranslateY(CONSTANT.FULLSCREEN),
        duration: props.duration,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setDummy(true);
      props.setScreen();
    });
  }

  function displayScreen() {
    Animated.timing(translateY.current, {
      toValue: height - CONSTANT.MARGIN,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setDummy(false);
      props.onHideAnimDone(showAnim);
    });
  }

  function showAnim() {
    Animated.parallel([
      Animated.timing(translateY.current, {
        toValue: 0,
        duration: props.duration,
        delay: props.duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity.current, {
        toValue: 1,
        duration: props.duration,
        delay: props.duration,
        useNativeDriver: true,
      }),
      Animated.timing(imageHeight.current, {
        toValue: getImageHeight(),
        duration: props.duration,
        delay: props.duration,
        useNativeDriver: false,
      }),
      Animated.timing(imageTranslateY.current, {
        toValue: getImageTranslateY(CONSTANT.CALCULATED),
        duration: props.duration,
        delay: props.duration,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function getImageTranslateY(type) {
    switch (type) {
      case CONSTANT.FULLSCREEN: {
        const windowMiddle = getWindowHeight() / 2;
        const imageMiddle = parseFloat(JSON.stringify(imageHeight.current)) / 2;
        return windowMiddle - imageMiddle - CONSTANT.MARGIN;
      }
      case CONSTANT.CALCULATED: {
        const viewMiddle = topViewHeight / 2;
        const imageMiddle = parseFloat(JSON.stringify(imageHeight.current)) / 2;
        const translateY = viewMiddle - imageMiddle;
        return Math.max(translateY, 0);
      }
      default: {
        return 0;
      }
    }
  }

  function getWindowHeight() {
    return Dimensions.get('window').height;
  }

  function getMaxImageSize() {
    return getWindowHeight() / 2.8;
  }

  function getMinImageSize() {
    return getWindowHeight() * 0.2;
  }

  function getImageHeight() {
    const windowHeight = getWindowHeight();
    const imageSize = (height ? windowHeight - height : windowHeight) - CONSTANT.MARGIN;
    const maxImageSize = getMaxImageSize();
    const minImageSize = getMinImageSize();
    if (imageSize > maxImageSize) return maxImageSize;
    if (imageSize < minImageSize) return minImageSize;
    return imageSize;
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.topContainer}
        onLayout={event => setTopViewHeight(event.nativeEvent.layout.height)}
      >
        <Animated.Image
          style={{
            ...styles.image,
            height: imageHeight.current,
            transform: [{ translateY: imageTranslateY.current }],
          }}
          source={props.image} resizeMode='contain' />
      </View>

      <Animated.View
        style={{
          ...styles.bottomContainer,
          transform: [{ translateY: translateY.current }],
          opacity: dummy ? 0 : 1
        }}
        onLayout={event => setHeight(event.nativeEvent.layout.height)}
      >
        <Animated.View style={{ opacity: opacity.current }}>
          {props.children}
        </Animated.View>
      </Animated.View>

      { dummy && <View style={styles.dummy} />}
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
  },
  image: {
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: CONSTANT.MARGIN,
  },
  dummy: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: CONSTANT.MARGIN,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

export default Navigation;