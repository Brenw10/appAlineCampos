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
  const [callback, setCallback] = useState();

  function onScreenChange(screen, cb) {
    if (screen) {
      setNewScreen(screen);
      setCallback(cb);
    }
  }

  async function onHideAnimDone(showAnim) {
    await callback;
    showAnim();
  }

  return (
    <>
      <Navigation
        duration={500}
        delay={0}
        image={require('../assets/logo.png')}
        setScreen={() => setScreen(newScreen)}
        onHideAnimDone={onHideAnimDone}>
        {
          screen.NAME === SCREENS.INIT.NAME &&
          <WelcomeLogin onScreenChange={onScreenChange} />
        }
        {
          screen.NAME === SCREENS.LOGIN.NAME &&
          <UserLogin onScreenChange={onScreenChange} />
        }
        {
          screen.NAME === SCREENS.ACTIONS.NAME &&
          <Actions onScreenChange={onScreenChange} />
        }
        {
          screen.NAME === SCREENS.SCHEDULE.NAME &&
          <Schedule onScreenChange={onScreenChange} />
        }
        {
          screen.NAME === SCREENS.SCHEDULING.NAME &&
          <Scheduling onScreenChange={onScreenChange} />
        }
      </Navigation>
    </>
  )
};

export default Login;