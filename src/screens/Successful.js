import React from 'react';
import Logo from '../components/Logo';
import DefaultButton from '../components/DefaultButton';

function Successful({ setRoute, description }) {
  return (
    <>
      <Logo title='Realizado com Sucesso!' description={description} />
      <DefaultButton
        icon='angle-left' text='Voltar ao Menu' isLeft={true}
        onClick={() => setRoute('Actions')}
      />
    </>
  );
}

export default Successful;