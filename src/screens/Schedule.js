import React from "react";
import { StyleSheet, View } from "react-native";
import ClientCalendar from '../components/ClientCalendar';
import PrimaryButton from "../components/PrimaryButton";

function Schedule({ setRoute }) {
  return (
    <>
      <PrimaryButton style={styles.back}
        icon='angle-left' text='Voltar' isLeft={true}
        onClick={() => setRoute('Actions')} />
      <View style={{ height: '100%' }}>
        <ClientCalendar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: -20,
  },
});

export default Schedule;