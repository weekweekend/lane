import { LeftOutline } from 'antd-mobile-icons';
import './index.less';
import { useState } from 'react';
import ProvideNumber from './ProvideNumber';
import VerifyNumber from './VerifyNumber';
import ResetPassword from './ResetPassword';

const ChangePassword = () => {
  const [curPage, setCurPage] = useState('provideNumber');
  const [phone, setPhone] = useState('');

  const onProvideNumber = (phone: string) => {
    setCurPage('verifyNumber');
    setPhone(phone);
  };
  const onVerifyNumber = () => {
    setCurPage('resetPassword');
  };

  return (
    <>
      <div className="nav">
        <div>
          <LeftOutline onClick={() => history.back()} />
          <h2>
            {curPage === 'provideNumber' && '找回密码'}
            {curPage === 'verifyNumber' && '身份验证'}
            {curPage === 'resetPassword' && '重置密码'}
          </h2>
        </div>
      </div>
      {curPage === 'provideNumber' && <ProvideNumber onProvideNumber={onProvideNumber} />}
      {curPage === 'verifyNumber' && <VerifyNumber phone={phone} onVerifyNumber={onVerifyNumber} />}
      {curPage === 'resetPassword' && <ResetPassword />}
    </>
  );
};
export default ChangePassword;
