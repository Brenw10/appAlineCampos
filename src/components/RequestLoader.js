import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Axios from 'axios';
import { Bar } from 'react-native-progress';

function RequestLoader() {
  const [loading, setLoading] = useState();

  useEffect(() => {
    interceptor();
  }, []);

  function interceptor() {
    Axios.interceptors.request.use(
      results => {
        setLoading(true);
        return results;
      },
      error => Promise.reject(error)
    );
    Axios.interceptors.response.use(
      results => {
        setLoading(false);
        return results;
      },
      error => Promise.reject(error)
    );
  }

  return (
    <>
      {
        loading &&
        <View style={styles.container}>
          <Bar indeterminate={true}
            width={null}
            color="#1c4799"
            useNativeDriver={true}
            height={3}
            borderWidth={0} />
        </View >
      }
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