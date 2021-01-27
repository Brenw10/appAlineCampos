import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import IconButton from '../components/IconButton';
import DateTime from '../services/DateTime';

function SelectDate(props) {
  const [mode, setMode] = useState();

  function onChangeDateTime(selectedDate) {
    setMode();
    if (!selectedDate) return;
    props.setDate(selectedDate);
  }

  return (
    <>
      <View style={styles.container}>
        <IconButton
          name='calendar'
          onPress={() => setMode('date')}
          disabled={props.disabled}
        />
        <Text style={styles.date}>
          {
            props.date
              ?
              DateTime.getDateFormat(props.date)
              :
              props.message
          }
        </Text>
      </View>
      {
        mode &&
        <DateTimePicker
          mode={mode}
          is24Hour={true}
          value={props.date || new Date()}
          onChange={(_, selectedDate) => onChangeDateTime(selectedDate)}
          maximumDate={props.maximumDate}
          minimumDate={props.minimumDate}
        />
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
  },
  date: {
    marginLeft: 10,
  }
});

export default SelectDate;