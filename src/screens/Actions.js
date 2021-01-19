import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import SCREENS from '../constants/screens';

function Actions({ onScreenChange }) {
  const buttons = [
    {
      title: 'Agendar Consulta',
      icon: 'calendar',
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
  ];

  return (
    <>
      {
        buttons.map((value, i) =>
          <PrimaryButton key={i} text={value.title} icon={value.icon}
            onClick={() => onScreenChange(value.screen)}
          />
        )
      }
    </>
  );
}

export default Actions;