import React, { useState } from 'react';
import HeaderDisplay from '../components/HeaderDisplay';
import WelcomeLogin from './WelcomeLogin';
import UserLogin from './UserLogin';
import SCREENS from '../constants/screens';
import Actions from './Actions';

function Login() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [newScreen, setNewScreen] = useState(screen);

  return (
    <>
      <HeaderDisplay
        flex={newScreen.FLEX}
        imageSize={newScreen.IMAGE_SIZE}
        duration={500}
        image={require('../assets/logo.png')}
        imageDefaultSize={200}
        onFirstAnimDone={() => setScreen(newScreen)}>
        {
          screen.NAME === SCREENS.WELCOME.NAME &&
          <WelcomeLogin onClickStart={() => setNewScreen(SCREENS.LOGIN)} />
        }
        {
          screen.NAME === SCREENS.LOGIN.NAME &&
          <UserLogin onClickEnter={() => setNewScreen(SCREENS.HOME)} />
        }
        {
          screen.NAME === SCREENS.HOME.NAME &&
          <Actions onClick={() => setNewScreen(SCREENS.WELCOME)} />
        }
      </HeaderDisplay>
    </>
  )
};

export default Login;