import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import WelcomeLogin from './WelcomeLogin';
import UserLogin from './UserLogin';
import SCREENS from '../constants/screens';
import Actions from './Actions';
import Schedule from './Schedule';
import Scheduling from './Scheduling';

function Login() {
  const [screen, setScreen] = useState(SCREENS.INIT);
  const [newScreen, setNewScreen] = useState(screen);

  function onScreenChange(screen) {
    return screen && setNewScreen(screen);
  }

  return (
    <>
      <Navigation
        duration={500}
        delay={0}
        image={require('../assets/logo.png')}
        setScreen={() => setScreen(newScreen)}
        onHideAnimDone={showAnim => showAnim()}>
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
        {
          screen.NAME === SCREENS.SCHEDULING.NAME &&
          <Scheduling onScreenChange={screen => onScreenChange(screen)} />
        }
      </Navigation>
    </>
  )
};

export default Login;