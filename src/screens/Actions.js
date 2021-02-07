import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import DefaultButton from "../components/DefaultButton";
import { GoogleSignin } from '@react-native-community/google-signin';
import Logo from "../components/Logo";

const BUTTONS = [
  {
    TITLE: 'Agendar Consulta',
    ICON: 'calendar',
    SCREEN: 'SchedulingTreatment',
  },
  {
    TITLE: 'Ver Minhas Consultas',
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
  const [user, setUser] = useState();

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const { user } = await GoogleSignin.getCurrentUser();
    setUser(user);
  }

  async function onClickAction(value) {
    await value.FUNCTION && value.FUNCTION();
    setRoute(value.SCREEN);
  }

  return (
    <View>
      <Logo title={`Olá ${user ? user.name : ''}`} description='Selecione uma das opções abaixo' />
      <ScrollView>
        {
          BUTTONS.map((value, i) =>
            <DefaultButton key={i} text={value.TITLE} icon={value.ICON}
              onClick={() => onClickAction(value)}
            />
          )
        }
      </ScrollView>
    </View>
  );
}

export default Actions;