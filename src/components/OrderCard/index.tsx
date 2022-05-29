import { FC, useEffect, useState } from 'react';
import { Tag, Image, Divider, NavBar } from 'antd-mobile';
import { RightOutline, DownOutline, EditSOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';
import React, { RefObject } from 'react';
import { Form, Input, Button, Dialog, TextArea, DatePicker, Selector, Slider, Stepper, Switch } from 'antd-mobile';
import dayjs from 'dayjs';
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker';
import request from 'utils/request';
import Item from 'pages/Item';

const OrderCard: FC<{
  orderId: number;
  shopId: number;
  image: string;
  shopName: string;
  state: string;
  discount?: Array<string>;
  goods: Array<{
    image: string;
    name: string;
  }>;
  totalPrice: number;
  number: number;
  evaluate: boolean;
}> = ({ orderId, shopId, image, shopName, state, discount, goods, totalPrice, number, evaluate }) => {
  return (
    <div className="order-card">
      <div className="order-card-title">
        <div>
          <Image src={image} />
          <h3>{shopName}</h3>
          <RightOutline />
        </div>
        <div>{state}</div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};
export default OrderCard;
