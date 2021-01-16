import React from 'react';
import { StyleSheet, Text } from 'react-native';

function Logo({ title, description }) {
  return (
    <>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 23,
    color: '#0f2f49',
    fontWeight: '700',
  },
  description: {
    color: '#939394',
  },
});

export default Logo;