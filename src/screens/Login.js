import React, { useState } from 'react';
import HeaderDisplay from '../components/HeaderDisplay';
import WelcomeLogin from './WelcomeLogin';
import UserLogin from './UserLogin';
import SCREENS from '../constants/screens';

function Login() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [newScreen, setNewScreen] = useState(screen);

  return (
    <>
      <HeaderDisplay flex={newScreen.FLEX} imageSize={newScreen.IMAGE_SIZE} duration={500}
        onFirstAnimDone={() => setScreen(newScreen)}>
        {
          screen === SCREENS.WELCOME &&
          <WelcomeLogin onClickStart={() => setNewScreen(SCREENS.LOGIN)} />
        }
        {
          screen === SCREENS.LOGIN &&
          <UserLogin onClickEnter={() => setNewScreen(SCREENS.HOME)} />
        }
      </HeaderDisplay>
    </>
  )
};

export default Login;