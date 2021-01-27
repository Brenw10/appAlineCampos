import React, { useLayoutEffect, useState } from 'react';
import { TIME } from '../constants/SelectTime';
import DateTime from '../services/DateTime';
import { ButtonGroup } from 'react-native-elements';

function SelectTime() {
  const [time, setTime] = useState([]);

  useLayoutEffect(() => {
    setTime(getTime());
  }, []);

  function getTime() {
    const start = DateTime.Moment().set({ hours: TIME.START_TIME.HOUR, minutes: TIME.START_TIME.MINUTE });
    const end = DateTime.Moment().set({ hours: TIME.END_TIME.HOUR, minutes: TIME.END_TIME.MINUTE, });
    const diff = DateTime.Moment(end).diff(start, 'minute');
    const times = diff / TIME.COUNTING_MINUTES;
    return [...Array(times).keys()].map(value =>
      DateTime.addDate(start, 'minute', value * TIME.COUNTING_MINUTES)
    );
  }

  return <ButtonGroup vertical
    buttons={time.map(value => DateTime.getHourFormat(value))}
  />
}

export default SelectTime;