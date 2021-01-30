import React, { useEffect, useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { CALENDAR } from '../constants/Calendar';
import DateTime from '../services/DateTime';
import Appointment from '../services/Appointment';
import User from '../services/User';
import AppointmentItem from '../components/AppointmentItem';
import PrimaryButton from '../components/PrimaryButton';
import DefaultModal from '../components/DefaultModal';
import Section from '../components/Section';
import { StyleSheet, View } from 'react-native';
import DefaultButton from '../components/DefaultButton';

LocaleConfig.defaultLocale = 'pt-BR';

function Schedule({ setRoute }) {
  const [user, setUser] = useState();
  const [items, setItems] = useState({});
  const [appointment, setAppointment] = useState();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const currentUser = await User.get();
    const appointments = await Appointment.getAll();
    const newItems = getItems(appointments.data);
    setUser(currentUser.data);
    setItems(newItems);
  }

  function getItems(data) {
    const dates = getUniqueDates(data);
    const datesPopulated = getDatesPopulated(dates, data);
    return getDatesItemFormat(datesPopulated);
  }

  function getUniqueDates(data) {
    return data
      .map(value => DateTime.getDefaultDateFormat(value.datetime))
      .filter((value, index, array) => index === array.findIndex(v => v === value))
  }

  function getDatesPopulated(dates, data) {
    return dates.map(value => ({
      [value]: data.filter(v => DateTime.getDefaultDateFormat(v.datetime) === value)
    }));
  }

  function getDatesItemFormat(data) {
    return data.reduce((obj, value) => Object.assign(obj, value), {});
  }

  return (
    <>
      <PrimaryButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('Actions')} />
      <View style={styles.container}>
        <Agenda
          items={items}
          pastScrollRange={0}
          futureScrollRange={CALENDAR.MAX_MONTH}
          renderItem={item =>
            <AppointmentItem
              item={item} disabled={!user.admin}
              onPress={() => setAppointment(item)} />
          }
        />
      </View>
      <DefaultModal
        isModalVisible={!!appointment}
        setIsModalVisible={setAppointment}>
        {
          appointment &&
          <>
            <Section
              title='Aprovamento de consulta'
              description={appointment._id}
            />
            <View style={styles.buttonsContainer}>
              <DefaultButton style={styles.rejectButton} relativeIcon={true}
                icon='close' text='Rejeitar' isLeft={true}
                onClick={() => setRoute('Actions')}
              />
              <DefaultButton style={styles.acceptButton} relativeIcon={true}
                icon='check' text='Aceitar'
                onClick={() => createAppointment()}
              />
            </View>
          </>
        }
      </DefaultModal>
    </>
  )
};

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
  container: {
    height: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rejectButton: {
    flex: 0.5,
    marginRight: 10,
    backgroundColor: '#c71441',
  },
  acceptButton: {
    flex: 0.5,
    marginLeft: 10,
  },
});

export default Schedule;