import { FC, useState } from 'react';
import { Tag, Image, Divider, NavBar } from 'antd-mobile';
import { CloseOutline, DownOutline, EditSOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';
import React, { RefObject } from 'react';
import { Form, Input, Button, Dialog, TextArea, DatePicker, Selector, Slider, Stepper, Switch } from 'antd-mobile';
import dayjs from 'dayjs';
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker';

const AddressCard: FC<{
  id: number;
  address: string;
  addrDetail: string;
  name: string;
  sex: string;
  phone: string;
  tag?: string;
  cur: boolean;
}> = ({ id, address, addrDetail, name, sex, phone, tag, cur }) => {
  return (
    <div className="address-card">
      <div className="address-card-content">
        <div>
          <Tag>{tag}</Tag>
          <h2>
            {address}
            {addrDetail}
          </h2>
        </div>
        <div className="address-card-content-msg">
          <span>
            {name}
            {sex == '女' ? '(女士)' : '(先生)'}
          </span>
          <span>{phone}</span>
        </div>
      </div>
      <Link to={`edit?id=${encodeURIComponent(id)}`} onClick={(e) => e.stopPropagation()}>
        <EditSOutline color="#ccc" />
      </Link>
    </div>
  );
};
export default AddressCard;
