import { Button, List, Avatar } from 'antd-mobile';
import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.less';
import { MdPhoneAndroid } from 'react-icons/md';
import request from 'utils/request';

const Mine = () => {
  const [account, setAccount] = useState<any>({});

  useEffect(() => {
    request('account', 'GET').then((data) => setAccount(data.data));
  }, []);

  return (
    <div className="mine">
      <div className="mine-nav">
        <Avatar src={account.avatar} />
        <h2>
          {/^\d{3}/.exec(account.account)}****{/\d{4}$/.exec(account.account)}
        </h2>
      </div>
      <List header="基础信息">
        <List.Item extra={account.nickname} onClick={() => (window.location.href = '#/mine/NicknameEdit')}>
          昵称
        </List.Item>
        <List.Item onClick={() => (window.location.href = '#/mine/intro')}>简介</List.Item>
        <List.Item onClick={() => (window.location.href = '#/address')}>收货地址</List.Item>
      </List>
      <List header="账号绑定">
        <List.Item prefix={<MdPhoneAndroid color="#ccc" />} extra={account.account} clickable>
          手机
        </List.Item>
      </List>
      <List header="安全设置">
        <List.Item extra="修改" onClick={() => (window.location.href = '#/signIn/changePassword')}>
          登陆密码
        </List.Item>
      </List>
      <Button
        color="danger"
        shape="rounded"
        block
        onClick={() => {
          localStorage.removeItem('token');
          window.location.reload();
        }}
      >
        退出当前账号
      </Button>
    </div>
  );
};
export default Mine;
