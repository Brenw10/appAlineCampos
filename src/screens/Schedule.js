import React from "react";
import { StyleSheet, View } from "react-native";
import ClientCalendar from '../components/ClientCalendar';
import PrimaryButton from "../components/PrimaryButton";
import SCREENS from '../constants/screens';

function Schedule({ onScreenChange }) {
  return (
    <>
      <PrimaryButton styles={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => onScreenChange(SCREENS.ACTIONS)} />
      <ClientCalendar />
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
});

export default Schedule;