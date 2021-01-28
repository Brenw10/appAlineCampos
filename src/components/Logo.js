import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Logo({ title, description }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
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