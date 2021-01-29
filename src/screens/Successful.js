import React from 'react';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';

function Successful({ setRoute, description }) {
  return (
    <>
      <Logo title='Realizado com Sucesso!' description={description} />
      <PrimaryButton
        icon='angle-left' text='Voltar ao Menu' isLeft={true}
        onClick={() => setRoute('Actions')}
      />
    </>
  );
}

export default Successful;