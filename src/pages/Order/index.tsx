import { Button, List, Avatar, Tabs, Swiper, Divider, Rate, Space, Toast, Selector, Image } from 'antd-mobile';
import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { MdPhoneAndroid } from 'react-icons/md';
import OrderCard from 'components/OrderCard';
import request from 'utils/request';

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    request('orders', 'GET').then((data) => setOrderList(data.data.rows));
  }, []);
  return (
    <div className="order">
      {orderList.map((item: any) => (
        <OrderCard {...item} key={item.orderId} />
      ))}
    </div>
  );
};
export default Order;
