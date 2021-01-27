import React from "react";
import { ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const BUTTONS = [
  {
    TITLE: 'Agendar Consulta',
    ICON: 'calendar',
    SCREEN: 'Scheduling',
  },
  {
    TITLE: 'Ver Consultas',
    ICON: 'bookmark',
    SCREEN: 'Schedule',
  },
  {
    TITLE: 'Sair',
    ICON: 'reply',
    SCREEN: 'WelcomeLogin',
  },
];

function Actions({ setRoute }) {
  return (
    <ScrollView>
      {
        BUTTONS.map((value, i) =>
          <PrimaryButton key={i} text={value.TITLE} icon={value.ICON}
            onClick={() => setRoute(value.SCREEN)}
          />
        )
      }
    </ScrollView>
  );
}

export default Actions;