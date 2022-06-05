import { Button, List } from 'antd-mobile';
import { useState, useEffect } from 'react';
import './index.less';
import { MdPhoneAndroid } from 'react-icons/md';
import request from 'utils/request';

const Mine = () => {
  const [accountMessage, setAccountMessage] = useState<any>({});

  useEffect(() => {
    request('account', 'GET').then((data) => setAccountMessage(data.data));
  }, []);

  return (
    <div className="mine">
      <List header="基础信息">
        <List.Item extra={accountMessage.nickname} onClick={() => (window.location.href = '#/mine/NicknameEdit')}>
          昵称
        </List.Item>
        <List.Item onClick={() => (window.location.href = '#/mine/intro')}>简介</List.Item>
        <List.Item onClick={() => (window.location.href = '#/address')}>收货地址</List.Item>
      </List>
      <List header="账号绑定">
        <List.Item prefix={<MdPhoneAndroid color="#ccc" />} extra={accountMessage.account} clickable>
          手机
        </List.Item>
      </List>
      <List header="安全设置">
        <List.Item extra="修改" onClick={() => (window.location.href = '#/signIn/changePassword')}>
          登陆密码
        </List.Item>
      </List>
      <Button color="danger" shape="rounded" block>
        退出当前账号
      </Button>
    </div>
  );
};
export default Mine;
