import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Axios from 'axios';

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
          <ActivityIndicator size="large" color="#1c4799" />
        </View >
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    position: 'absolute',
    backgroundColor: "rgba(0,0,0,0.5)"
  },
});

export default RequestLoader;