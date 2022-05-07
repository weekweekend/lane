import React, { Suspense, useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Toast, Modal, Checkbox } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import './index.less';
import { get } from 'utils/request';
import SignInCode from './SignInCode';
import SignInPassword from './SignInPassword';

const SignIn = () => {
  const [loginType, setLoginType] = useState('code');

  return (
    <>
      <div className="switch">
        <a href="#/personalCenter">
          <CloseOutline />
        </a>
        <Button fill="none" onClick={() => setLoginType(loginType === 'code' ? 'password' : 'code')}>
          {loginType === 'code' ? '密码登录' : '手机号登录'}
        </Button>
      </div>
      <SignInCode show={loginType === 'code' ? 'block' : 'none'} />
      <SignInPassword show={loginType === 'password' ? 'block' : 'none'} />
    </>
  );
};
export default SignIn;
