import React from 'react';
import { StyleSheet, Text } from 'react-native';

function SectionHeader({ title, description }) {
  return (
    <>
      {title && <Text style={styles.header}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    margin: 15,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  description: {
    lineHeight: 25,
  },
});

export default SectionHeader;