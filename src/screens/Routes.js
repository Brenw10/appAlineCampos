import React from 'react';
import Navigation from '../components/Navigation';
import WelcomeLogin from './WelcomeLogin';
import UserLogin from './UserLogin';
import Actions from './Actions';
import Schedule from './Schedule';
import Scheduling from './Scheduling';
import SchedulingResult from './SchedulingResult';
import Successful from './Successful';

function Login() {
  return (
    <>
      <Navigation
        duration={500}
        initial='WelcomeLogin'
        image={require('../assets/images/logo.png')}>
        <WelcomeLogin route='WelcomeLogin' />
        <UserLogin route='UserLogin' />
        <Actions route='Actions' />
        <Schedule route='Schedule' />
        <Scheduling route='Scheduling' />
        <SchedulingResult route='SchedulingResult' />
        <Successful route='Successful' />
      </Navigation>
    </>
  )
};

export default Login;