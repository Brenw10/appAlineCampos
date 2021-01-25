import React from "react";
import { ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SCREENS from '../constants/screens';

const BUTTONS = [
  {
    TITLE: 'Agendar Consulta',
    ICON: 'calendar',
    SCREEN: SCREENS.SCHEDULING,
  },
  {
    TITLE: 'Ver Consultas',
    ICON: 'bookmark',
    SCREEN: SCREENS.SCHEDULE,
  },
  {
    TITLE: 'Sair',
    ICON: 'reply',
    SCREEN: SCREENS.INIT,
  },
];

function Actions({ onScreenChange }) {
  return (
    <ScrollView>
      {
        BUTTONS.map((value, i) =>
          <PrimaryButton key={i} text={value.TITLE} icon={value.ICON}
            onClick={() => onScreenChange(value.SCREEN)}
          />
        )
      }
    </ScrollView>
  );
}

export default Actions;