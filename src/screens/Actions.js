import React from "react";
import PrimaryButton from "../components/PrimaryButton";
import SCREEN from '../constants/screens';

function Actions({ onScreenChange }) {
  const buttons = [
    {
      title: 'Agendar uma consulta',
      icon: 'calendar',
      screen: SCREEN.SCHEDULE,
    },
    {
      title: 'Ver minhas consultas',
      icon: 'bookmark',
    },
    {
      title: 'Pacotes Promocionais',
      icon: 'archive',
    },
    {
      title: 'Dicas de saúde',
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