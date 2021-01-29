import React, { useEffect, useState } from 'react';
import { TIME } from '../constants/SelectTime';
import DateTime from '../services/DateTime';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function SelectTime(props) {
  const [time, setTime] = useState([]);
  const [index, setIndex] = useState();

  useEffect(() => {
    setTime(getTime());
  }, []);

  function getTime() {
    const start = DateTime.Moment().set({ hours: TIME.START_TIME.HOUR, minutes: TIME.START_TIME.MINUTE });
    const end = DateTime.Moment().set({ hours: TIME.END_TIME.HOUR, minutes: TIME.END_TIME.MINUTE, });
    const diff = DateTime.Moment(end).diff(start, 'minute');
    const times = diff / TIME.COUNTING_MINUTES + 1;
    return [...Array(times).keys()].map(value =>
      DateTime.addDate(start, 'minute', value * TIME.COUNTING_MINUTES)
    );
  }

  function onToggleItem(i) {
    setIndex(i);
    props.onSelectItem(time[i]);
  }

  function renderItems() {
    return time.map((value, i) =>
      <TouchableOpacity key={i} onPress={() => onToggleItem(i)}
        style={{ ...styles.item, backgroundColor: i === index ? '#d8d8d8' : '#fafafa' }}>
        <Text style={styles.hour}>
          {DateTime.getHourFormat(value)}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {renderItems()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#fafafa',
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: '#eeeeee',
    borderWidth: 1,
  },
  hour: {
    color: '#42484c',
    fontWeight: 'bold',
  }
});

export default SelectTime;