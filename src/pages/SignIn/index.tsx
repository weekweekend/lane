import React, { Suspense, useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Toast, Modal, Checkbox } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import './index.less';
import SignInCode from './SignInCode';
import SignInPassword from './SignInPassword';

const SignIn = () => {
  const [loginType, setLoginType] = useState(sessionStorage.getItem('loginType') || 'code');

  const onClick = () => {
    const type = loginType === 'code' ? 'password' : 'code';
    setLoginType(type);
    sessionStorage.setItem('loginType', type);
  };

  return (
    <>
      <div className="switch">
        <CloseOutline onClick={() => history.back()} />
        <Button fill="none" onClick={onClick}>
          {loginType === 'code' ? '密码登录' : '手机号登录'}
        </Button>
      </div>
      {loginType === 'code' && <SignInCode />}
      {loginType === 'password' && <SignInPassword />}
    </>
  );
};
export default SignIn;
