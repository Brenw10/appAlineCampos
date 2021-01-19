import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import WelcomeLogin from './WelcomeLogin';
import UserLogin from './UserLogin';
import SCREENS from '../constants/screens';
import Actions from './Actions';
import Schedule from './Schedule';

function Login() {
  const [screen, setScreen] = useState(SCREENS.INIT);
  const [newScreen, setNewScreen] = useState(screen);

  function onHideAnimDone(showAnim) {
    setScreen(newScreen);
    showAnim();
  }

  function onScreenChange(screen) {
    return screen && setNewScreen(screen);
  }

  return (
    <>
      <Navigation
        flex={newScreen.FLEX}
        imageSize={newScreen.IMAGE_SIZE}
        duration={500}
        image={require('../assets/logo.png')}
        imageDefaultSize={200}
        onHideAnimDone={showAnim => onHideAnimDone(showAnim)}>
        {
          screen.NAME === SCREENS.INIT.NAME &&
          <WelcomeLogin onScreenChange={screen => onScreenChange(screen)} />
        }
        {
          screen.NAME === SCREENS.LOGIN.NAME &&
          <UserLogin onScreenChange={screen => onScreenChange(screen)} />
        }
        {
          screen.NAME === SCREENS.ACTIONS.NAME &&
          <Actions onScreenChange={screen => onScreenChange(screen)} />
        }
        {
          screen.NAME === SCREENS.SCHEDULE.NAME &&
          <Schedule onScreenChange={screen => onScreenChange(screen)} />
        }
      </Navigation>
    </>
  )
};

export default Login;