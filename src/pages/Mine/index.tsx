import { Button, List, Avatar, Tabs, Swiper, Divider, Rate, Space, Toast, Selector, Image } from 'antd-mobile';
import {
  RightOutline,
  SearchOutline,
  MoreOutline,
  HeartOutline,
  HeartFill,
  LeftOutline,
  PhoneFill,
  EnvironmentOutline,
} from 'antd-mobile-icons';
import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
import GoodsContent from 'components/GoodsContent';
import { Action } from 'antd-mobile/es/components/popover';
import { MdPhoneAndroid } from 'react-icons/md';
import ShopEvaluateCard from 'components/ShopEvaluateCard';
import request from 'utils/request';
import ShopShoppingCar from 'components/ShopShoppingCar';

const Mine = () => {
  return (
    <div className="mine">
      <List header="基础信息">
        <List.Item extra={<Avatar src="" />} clickable>
          头像
        </List.Item>
        <List.Item onClick={() => (window.location.href = '#/mine/NicknameEdit')}>昵称</List.Item>
        <List.Item extra="未开启" clickable>
          简介
        </List.Item>
        <List.Item onClick={() => (window.location.href = '#/address')}>收货地址</List.Item>
      </List>
      <List header="账号绑定">
        <List.Item prefix={<MdPhoneAndroid color="#ccc" />} extra="未开启" clickable>
          手机
        </List.Item>
      </List>
      <List header="安全设置">
        <List.Item extra="修改" clickable>
          登陆密码
        </List.Item>
      </List>
      <Button color="danger" shape="rounded" block>
        退出当前账号
      </Button>
      <h1>{!localStorage.getItem('token') && <a href="#/signIn">点击前往登陆页面</a>} </h1>
    </div>
  );
};
export default Mine;
