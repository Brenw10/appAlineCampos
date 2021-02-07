import React from 'react';
import Navigation from '../components/Navigation';
import WelcomeLogin from './WelcomeLogin';
import UserLogin from './UserLogin';
import Actions from './Actions';
import Schedule from './Schedule';
import SchedulingTreatment from './SchedulingTreatment';
import SchedulingDate from './SchedulingDate';
import SchedulingTime from './SchedulingTime';
import SchedulingResult from './SchedulingResult';
import Successful from './Successful';
import Coupon from './Coupon';

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
        <SchedulingTreatment route='SchedulingTreatment' />
        <SchedulingDate route='SchedulingDate' />
        <SchedulingTime route='SchedulingTime' />
        <SchedulingResult route='SchedulingResult' />
        <Successful route='Successful' />
        <Coupon route='Coupon' />
      </Navigation>
    </>
  )
};

export default Login;