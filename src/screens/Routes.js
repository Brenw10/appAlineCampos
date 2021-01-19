import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import WelcomeLogin from './WelcomeLogin';
import UserLogin from './UserLogin';
import SCREENS from '../constants/screens';
import Actions from './Actions';

function Login() {
  const [screen, setScreen] = useState(SCREENS.INIT);
  const [newScreen, setNewScreen] = useState(screen);

  return (
    <>
      <Navigation
        flex={newScreen.FLEX}
        imageSize={newScreen.IMAGE_SIZE}
        duration={500}
        image={require('../assets/logo.png')}
        imageDefaultSize={200}
        onHideAnimDone={() => setScreen(newScreen)}>
        {
          screen.NAME === SCREENS.INIT.NAME &&
          <WelcomeLogin onClickStart={() => setNewScreen(SCREENS.LOGIN)} />
        }
        {
          screen.NAME === SCREENS.LOGIN.NAME &&
          <UserLogin onClickEnter={() => setNewScreen(SCREENS.ACTIONS)} />
        }
        {
          screen.NAME === SCREENS.ACTIONS.NAME &&
          <Actions onClick={() => setNewScreen(SCREENS.INIT)} />
        }
      </Navigation>
    </>
  )
};

export default Login;