import React from "react";
import ClientCalendar from '../components/ClientCalendar';
import PrimaryButton from "../components/PrimaryButton";
import SCREENS from '../constants/screens';

function Schedule({ onScreenChange }) {
  return (
    <>
      <PrimaryButton styles={{ marginTop: -20 }}
        icon='long-arrow-left' text='Voltar' isLeft={true}
        onClick={() => onScreenChange(SCREENS.ACTIONS)} />
      <ClientCalendar />
    </>
  );
}

export default Schedule;