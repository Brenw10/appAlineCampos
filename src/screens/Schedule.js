import React from "react";
import { StyleSheet } from "react-native";
import ClientCalendar from '../components/ClientCalendar';
import PrimaryButton from "../components/PrimaryButton";
import SCREENS from '../constants/screens';

function Schedule({ onScreenChange }) {
  return (
    <>
      <PrimaryButton style={styles.back}
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