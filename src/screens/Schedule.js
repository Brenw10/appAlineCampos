import React, { useEffect, useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { CALENDAR } from '../constants/Calendar';
import DateTime from '../services/DateTime';
import Appointment from '../services/Appointment';
import User from '../services/User';
import AppointmentItem from '../components/AppointmentItem';
import DefaultButton from '../components/DefaultButton';
import DefaultModal from '../components/DefaultModal';
import Section from '../components/Section';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppointmentDetail from '../components/AppointmentDetail';
import { APPOINTMENT } from '../constants/Appointment';
import { useAuth } from '../contexts/Auth';

LocaleConfig.defaultLocale = 'pt-BR';

function Schedule({ setRoute }) {
  const [user, setUser] = useState();
  const [items, setItems] = useState({});
  const [appointment, setAppointment] = useState();
  const { token } = useAuth();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const results = await Promise.all([
      User.get(token),
      Appointment.getAll(token),
    ]);
    const newItems = getItems(results[1].data);
    setUser(results[0].data);
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

  async function setAppointmentStatus(status) {
    await Appointment.setStatus(token, appointment._id, status.NAME);
    load();
    setAppointment();
  }

  return (
    <>
      <DefaultButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('Actions')} />
      <View style={styles.container}>
        <Agenda
          items={items}
          pastScrollRange={0}
          futureScrollRange={CALENDAR.MAX_MONTH}
          theme={{ agendaKnobColor: '#01877c' }}
          renderItem={item =>
            <AppointmentItem
              item={item}
              onPress={() => setAppointment(item)} />
          }
        />
      </View>
      <DefaultModal margin={10}
        isModalVisible={!!appointment}
        setIsModalVisible={setAppointment}>
        {
          appointment &&
          <ScrollView>
            <Section
              title={'Pedido de consulta de: ' + appointment.client.name}
            />
            <View style={styles.centered}>
              <Image
                style={styles.image}
                resizeMode='contain'
                source={{
                  uri: appointment.client.photo,
                }}
              />
              <Text style={styles.phone}>Tel. Contato: {appointment.client.number}</Text>
            </View>
            <AppointmentDetail
              appointment={appointment}
              coupon={appointment.coupon}
              isAdmin={user && user.admin} />
            <View style={styles.buttonsContainer}>
              {
                appointment.status !== APPOINTMENT.REJECTED.NAME &&
                <>
                  <DefaultButton style={styles.rejectButton} relativeIcon={true}
                    icon='close' text='Rejeitar' isLeft={true}
                    onClick={() => setAppointmentStatus(APPOINTMENT.REJECTED)}
                  />
                  {
                    user.admin && appointment.status !== APPOINTMENT.ACCEPTED.NAME &&
                    <DefaultButton style={styles.acceptButton} relativeIcon={true}
                      icon='check' text='Aceitar'
                      onClick={() => setAppointmentStatus(APPOINTMENT.ACCEPTED)}
                    />
                  }
                </>
              }
            </View>
          </ScrollView>
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
  centered: {
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
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
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginBottom: 20,
  },
  phone: {
    marginBottom: 10,
  },
});

export default Schedule;