import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Axios from 'axios';
import { Bar } from 'react-native-progress';

function RequestLoader() {
  const count = useRef(0);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    interceptor();
  }, []);

  function interceptor() {
    Axios.interceptors.request.use(
      results => {
        count.current++;
        setLoading(count.current);
        return results;
      },
      error => Promise.reject(error)
    );
    Axios.interceptors.response.use(
      results => {
        count.current--;
        setLoading(count.current);
        return results;
      },
      error => Promise.reject(error)
    );
  }

  return (
    <>
      <View style={{ ...styles.container, opacity: loading ? 1 : 0 }}>
        <Bar indeterminate={true}
          width={null}
          color="#1c4799"
          useNativeDriver={true}
          height={3}
          borderWidth={0} />
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
});

export default RequestLoader;