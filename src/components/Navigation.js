import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import Axios from 'axios';

const CONFIG = {
  MARGIN: 40,
  IMAGE_SIZE: 200,
};

const STATUS = {
  START: 'START',
  RESET: 'RESET',
  HIDE: 'HIDE',
  SHOW: 'SHOW',
};

function Navigation(props) {
  const [route, setRoute] = useState({ route: props.initial });
  const [status, setStatus] = useState(STATUS.SHOW);
  const [topViewHeight, setTopViewHeight] = useState(0);
  const [bottomViewHeight, setBottomViewHeight] = useState(0);
  const bottomViewTranslateY = useRef(new Animated.Value(0)).current;
  const bottomViewOpacity = useRef(new Animated.Value(1)).current;
  const imageTranslateY = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(1)).current;
  const count = useRef(0);
  const [loading, setLoading] = useState(0);
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    interceptor();
  }, []);

  useEffect(() => {
    if (status === STATUS.RESET && !loading) setStatus(STATUS.HIDE);
  }, [loading]);

  useEffect(() => {
    if (status === STATUS.START) {
      imageAnim(windowHeight - CONFIG.MARGIN * 2);
    } else if (status === STATUS.SHOW) {
      imageAnim(topViewHeight);
    }
  }, [topViewHeight, status]);

  function interceptor() {
    Axios.interceptors.request.use(
      results => {
        count.current++;
        setLoading(count.current);
        return results;
      },
      error => Promise.reject(error),
    );
    Axios.interceptors.response.use(
      results => {
        count.current--;
        setLoading(count.current);
        return results;
      },
      error => {
        count.current--;
        setLoading(count.current);
        return Promise.reject(error);
      }
    );
  }

  function hideAnim(route, arg) {
    setStatus(STATUS.START);
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
      setRoute({ route, arg });
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

  function imageAnim(height) {
    Animated.parallel([
      Animated.timing(imageTranslateY, {
        toValue: height / 2 - CONFIG.IMAGE_SIZE / 2,
        duration: props.duration,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: Math.min(1, height / CONFIG.IMAGE_SIZE),
        duration: props.duration,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function getComponent() {
    const array = React.Children.toArray(props.children);
    const component = array.find(child => child.props.route === route.route);
    return React.cloneElement(component, { ...route.arg, setRoute: hideAnim });
  }

  function onBottomViewLayout(height) {
    if (status === STATUS.HIDE) showAnim(height);
    if (status === STATUS.RESET && !loading) setStatus(STATUS.HIDE);
    setBottomViewHeight(height);
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.topContainer}
        onLayout={event => setTopViewHeight(event.nativeEvent.layout.height)}>
        <Animated.Image
          style={{
            ...styles.image,
            transform: [{
              translateY: imageTranslateY,
            }, {
              scale: imageScale
            }],
          }}
          source={props.image} resizeMode='contain' />
      </View>

      <Animated.View
        style={{
          ...styles.bottomContainer,
          transform: [{ translateY: bottomViewTranslateY }],
          opacity: status === STATUS.HIDE ? 0 : 1,
        }}
        onLayout={event => onBottomViewLayout(event.nativeEvent.layout.height)}>
        <Animated.View style={{
          opacity: bottomViewOpacity,
          position: status === STATUS.RESET ? 'absolute' : 'relative',
        }}>
          {getComponent()}
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
  },
  image: {
    width: '100%',
    height: CONFIG.IMAGE_SIZE,
    maxHeight: CONFIG.IMAGE_SIZE,
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