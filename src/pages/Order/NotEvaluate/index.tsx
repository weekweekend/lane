import { Button, List, Avatar, Tabs, Swiper, Divider, Rate, Space, Toast, Selector, Image } from 'antd-mobile';
import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { MdPhoneAndroid } from 'react-icons/md';
import OrderCard from 'components/OrderCard';
import request from 'utils/request';

const NotEvaluate = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    request('mock/getOrders.json', 'GET').then((data) => setOrderList(data.data));
  }, []);
  return (
    <div className="order">
      {orderList.map((item: any) => (
        <OrderCard {...item} key={item.orderId} />
      ))}
    </div>
  );
};
export default NotEvaluate;
