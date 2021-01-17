import React from "react";
import PrimaryButton from "../components/PrimaryButton";

function Actions() {
  const buttons = [
    {
      title: 'Agendar uma consulta',
      icon: 'calendar',
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
  ];

  return (
    <>
      {
        buttons.map((value, i) => <PrimaryButton key={i} text={value.title} icon={value.icon} />)
      }
    </>
  );
}

export default Actions;