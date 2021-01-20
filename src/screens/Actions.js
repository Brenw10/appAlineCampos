import React from "react";
import { ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SCREENS from '../constants/screens';

function Actions({ onScreenChange }) {
  const buttons = [
    {
      title: 'Agendar Consulta',
      icon: 'calendar',
      screen: SCREENS.SCHEDULING,
    },
    {
      title: 'Ver Consultas',
      icon: 'bookmark',
      screen: SCREENS.SCHEDULE,
    },
    {
      title: 'Pacotes Promocionais',
      icon: 'archive',
    },
    {
      title: 'Dicas de Saúde',
      icon: 'gratipay',
    },
    {
      title: 'Galeria de Fotos',
      icon: 'camera',
    },
    {
      title: 'Parceiros',
      icon: 'users',
    },
    {
      title: 'Sair',
      icon: 'reply',
      screen: SCREENS.INIT,
    },
  ];

  return (
    <ScrollView>
      {
        buttons.map((value, i) =>
          <PrimaryButton key={i} text={value.title} icon={value.icon}
            onClick={() => onScreenChange(value.screen)}
          />
        )
      }
    </ScrollView>
  );
}

export default Actions;