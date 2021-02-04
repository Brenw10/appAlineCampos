import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Worktime from '../services/Worktime';
import { useAuth } from '../contexts/Auth';

function SelectTime(props) {
  const [time, setTime] = useState([]);
  const [index, setIndex] = useState();
  const { token } = useAuth();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await Worktime.getAll(token);
    setTime(data);
  }

  function onToggleItem(i) {
    setIndex(i);
    props.onSelectItem(time[i].time);
  }

  function renderItems() {
    return time.map((value, i) =>
      <TouchableOpacity key={value._id} onPress={() => onToggleItem(i)}
        style={{ ...styles.item, backgroundColor: i === index ? '#d8d8d8' : '#fafafa' }}>
        <Text style={styles.hour}>
          {value.time}
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