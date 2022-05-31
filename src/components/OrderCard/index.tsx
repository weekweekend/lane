import { FC, useEffect, useState } from 'react';
import { Tag, Image, Divider, NavBar } from 'antd-mobile';
import { RightOutline, DownOutline, EditSOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';
import React, { RefObject } from 'react';
import { Form, Input, Button, Dialog, TextArea, DatePicker, Selector, Slider, Stepper, Switch } from 'antd-mobile';
import dayjs from 'dayjs';
import request from 'utils/request';
import Item from 'pages/Item';

const OrderCard: FC<{
  orderId: number;
  shopId: number;
  image: string;
  shopName: string;
  state: string;
  tag?: Array<string>;
  goods: Array<{
    image: string;
    name: string;
  }>;
  totalPrice: number;
  number: number;
  evaluation?: string;
  inEvaluated?: boolean;
}> = ({ orderId, shopId, image, shopName, state, tag, goods, totalPrice, number, evaluation, inEvaluated }) => {
  return (
    <div className="order-card">
      <div className="order-card-title">
        <div>
          <Image src={image} />
          <h3>{shopName}</h3>
          <RightOutline color="#999" />
        </div>
        <div className="order-state">{state}</div>
      </div>
      <div className="order-card-tag">
        {tag &&
          tag.map((item, idx) => (
            <Tag key={idx} color="orangered">
              {item}
            </Tag>
          ))}
      </div>

      <div className="order-card-goods">
        <div className="goods-left">
          {goods.length > 1 && goods.map((item, idx) => <Image key={idx} src={item.image} />)}
          {goods.length === 1 && (
            <>
              <Image src={goods[0].image} /> <span>{goods[0].name}</span>
            </>
          )}
        </div>
        <div className="goods-right">
          <div>
            <i>￥</i>
            <span>{totalPrice}</span>
          </div>
          <div>共{number}件</div>
        </div>
      </div>
      <div className="order-card-operation">
        {evaluation && !inEvaluated && (
          <Button color="primary" fill="outline" shape="rounded">
            再来一单
          </Button>
        )}
        {evaluation && inEvaluated && (
          <div>
            <p>{evaluation}</p>
            <Button color="primary" fill="outline" shape="rounded">
              再来一单
            </Button>
          </div>
        )}
        {!evaluation && !inEvaluated && (
          <>
            <a href={`#/order/addEvaluation?orderId=${encodeURIComponent(orderId)}`}>
              <Button shape="rounded">去评价</Button>
            </a>
            <Button color="primary" fill="outline" shape="rounded">
              再来一单
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default OrderCard;
