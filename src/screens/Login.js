import React, { useState } from 'react';
import HeaderDisplay from '../components/HeaderDisplay';
import WelcomeLogin from '../components/WelcomeLogin';
import UserLogin from '../components/UserLogin';

function Login() {
  const [userlogin, setUserLogin] = useState();
  const [flex, setFlex] = useState(0.35);
  const [imageSize, setImageSize] = useState(200);

  function onClickStart() {
    setFlex(0.6);
    setImageSize(150);
  }

  return (
    <>
      <HeaderDisplay flex={flex} imageSize={imageSize} duration={500}
        firstAnimDone={() => setUserLogin(true)}>
        {
          userlogin
            ? <UserLogin />
            : <WelcomeLogin onClickStart={() => onClickStart()} />
        }
      </HeaderDisplay>
    </>
  )
};

export default Login;