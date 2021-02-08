import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTime from '../services/DateTime';
import Appointment from '../services/Appointment';
import { useAuth } from '../contexts/Auth';

function SelectTime({ date, onSelectItem }) {
  const [times, setTimes] = useState([]);
  const [index, setIndex] = useState();
  const { token } = useAuth();

  useEffect(() => {
    load();
  }, [date]);

  async function load() {
    const { data } = await Appointment.getFreeTime(token, date);
    setTimes(data);
    setIndex();
    onSelectItem();
  }

  function onToggleItem(i) {
    setIndex(i);
    onSelectItem(times[i]);
  }

  function renderItems() {
    return times
      .map((value, i) =>
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
      {
        !times.length &&
        <Text>Nenhum horário disponível para este dia.</Text>
      }
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