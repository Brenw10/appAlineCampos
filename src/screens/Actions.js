import React from "react";
import { ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { GoogleSignin } from '@react-native-community/google-signin';

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
    TITLE: 'Sair da Conta',
    ICON: 'reply',
    SCREEN: 'WelcomeLogin',
    FUNCTION: () => {
      return GoogleSignin.revokeAccess()
        .then(() => GoogleSignin.signOut());
    },
  },
];

function Actions({ setRoute }) {
  async function onClickAction(value) {
    await value.FUNCTION && value.FUNCTION();
    setRoute(value.SCREEN);
  }

  return (
    <ScrollView>
      {
        BUTTONS.map((value, i) =>
          <PrimaryButton key={i} text={value.TITLE} icon={value.ICON}
            onClick={() => onClickAction(value)}
          />
        )
      }
    </ScrollView>
  );
}

export default Actions;