import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import DefaultButton from "../components/DefaultButton";
import { GoogleSignin } from '@react-native-community/google-signin';
import Logo from "../components/Logo";
import { useAuth } from '../contexts/Auth';
import User from '../services/User';

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
    TITLE: 'Cupons de Desconto',
    ICON: 'tags',
    SCREEN: 'Coupon',
    IS_ADMIN: true,
  },
  {
    TITLE: 'Localização da Clínica',
    ICON: 'map-marker',
    SCREEN: 'Location',
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
  const [isAdmin, setIsAdmin] = useState();
  const [user, setUser] = useState();
  const { token } = useAuth();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const results = await Promise.all([
      GoogleSignin.getCurrentUser(),
      User.get(token),
    ]);
    setUser(results[0].user);
    setIsAdmin(results[1].data.admin);
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
          BUTTONS
            .filter(value => isAdmin ? true : !value.IS_ADMIN)
            .map((value, i) =>
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