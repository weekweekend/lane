import { Button, List, Avatar, Tabs, Swiper, Divider, Rate, Space, Toast, Selector, Image } from 'antd-mobile';
import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { MdPhoneAndroid } from 'react-icons/md';
import request from 'utils/request';

const Mine = () => {
  const [loginMessage, setLoginMessage] = useState<any>({});
  useEffect(() => {
    request('mock/getLogin.json', 'GET').then((data) => setLoginMessage(data.data));
  }, []);

  return (
    <div className="mine">
      <List header="基础信息">
        <List.Item extra={<Avatar src={loginMessage.avatar} />} clickable>
          头像
        </List.Item>
        <List.Item extra={loginMessage.nickname} onClick={() => (window.location.href = '#/mine/NicknameEdit')}>
          昵称
        </List.Item>
        <List.Item onClick={() => (window.location.href = '#/mine/intro')}>简介</List.Item>
        <List.Item onClick={() => (window.location.href = '#/address')}>收货地址</List.Item>
      </List>
      <List header="账号绑定">
        <List.Item prefix={<MdPhoneAndroid color="#ccc" />} extra={loginMessage.account} clickable>
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
