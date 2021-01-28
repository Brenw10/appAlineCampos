import React from 'react';
import { StyleSheet, Text } from 'react-native';

function SectionHeader({ title, description }) {
  return (
    <>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  description: {
    lineHeight: 25,
  },
});

export default SectionHeader;