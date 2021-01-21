import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

const CONSTANT = {
  MARGIN: 40,
  FULLSCREEN: 'FULLSCREEN',
  CALCULATED: 'CALCULATED',
  MAX_IMAGE_SIZE: 200,
  MIN_IMAGE_SIZE: 100,
  IMAGE_SIZE_PERCENTAGE: 0.8,
};

function Navigation(props) {
  const propsRef = useRef(props);
  const bottomViewTranslateY = useRef(new Animated.Value(0));
  const opacity = useRef(new Animated.Value(1));
  const imageHeight = useRef();
  const imageTranslateY = useRef();
  const [bottomViewHeight, setBottomViewHeight] = useState();
  const [topViewHeight, setTopViewHeight] = useState();
  const [dummy, setDummy] = useState();

  useEffect(() => {
    if (props.children !== propsRef.current.children) hideAnim();
    props.current = props;
  }, [props.children]);

  useEffect(() => {
    if (bottomViewHeight && dummy) displayScreen();
  }, [bottomViewHeight]);

  useEffect(() => {
    const isFirstTime = imageHeight.current === undefined && imageTranslateY.current === undefined;
    if (isFirstTime && topViewHeight) {
      imageHeight.current = new Animated.Value(getImageHeight());
      imageTranslateY.current = new Animated.Value(getImageTranslateY(CONSTANT.CALCULATED));
    }
  }, [topViewHeight]);

  function hideAnim() {
    Animated.parallel([
      Animated.timing(bottomViewTranslateY.current, {
        toValue: bottomViewHeight - CONSTANT.MARGIN,
        duration: props.duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity.current, {
        toValue: 0,
        duration: props.duration,
        useNativeDriver: true,
      }),
      Animated.timing(imageHeight.current, {
        toValue: CONSTANT.MAX_IMAGE_SIZE,
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
    Animated.timing(bottomViewTranslateY.current, {
      toValue: bottomViewHeight - CONSTANT.MARGIN,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      setDummy(false);
      props.onHideAnimDone(showAnim);
    });
  }

  function showAnim() {
    Animated.parallel([
      Animated.timing(bottomViewTranslateY.current, {
        toValue: 0,
        duration: props.duration,
        delay: props.delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity.current, {
        toValue: 1,
        duration: props.duration,
        delay: props.delay,
        useNativeDriver: true,
      }),
      Animated.timing(imageHeight.current, {
        toValue: getImageHeight(),
        duration: props.duration,
        delay: props.delay,
        useNativeDriver: false,
      }),
      Animated.timing(imageTranslateY.current, {
        toValue: getImageTranslateY(CONSTANT.CALCULATED),
        duration: props.duration,
        delay: props.delay,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function getImageTranslateY(type) {
    switch (type) {
      case CONSTANT.FULLSCREEN: {
        const windowMiddle = getWindowHeight() / 2;
        const imageMiddle = CONSTANT.MAX_IMAGE_SIZE / 2;
        return windowMiddle - imageMiddle - CONSTANT.MARGIN;
      }
      case CONSTANT.CALCULATED: {
        const viewMiddle = topViewHeight / 2;
        const imageMiddle = getImageHeight() / 2;
        return viewMiddle - imageMiddle;
      }
      default: {
        return 0;
      }
    }
  }

  function getWindowHeight() {
    return Dimensions.get('window').height;
  }

  function getImageHeight() {
    const imageSize = topViewHeight * CONSTANT.IMAGE_SIZE_PERCENTAGE;
    if (imageSize > CONSTANT.MAX_IMAGE_SIZE) return CONSTANT.MAX_IMAGE_SIZE;
    if (imageSize < CONSTANT.MIN_IMAGE_SIZE) return CONSTANT.MIN_IMAGE_SIZE;
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
            transform: [{ translateY: imageTranslateY.current || 0 }],
          }}
          source={props.image} resizeMode='contain' />
      </View>

      <Animated.View
        style={{
          ...styles.bottomContainer,
          transform: [{ translateY: bottomViewTranslateY.current }],
          opacity: dummy ? 0 : 1,
          maxHeight: (1 - (CONSTANT.MIN_IMAGE_SIZE / getWindowHeight())) * 100 + "%",
        }}
        onLayout={event => setBottomViewHeight(event.nativeEvent.layout.height)}
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