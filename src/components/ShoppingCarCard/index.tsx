import { FC, useState } from 'react';
import { Image, Button, Popup, Stepper } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';
import request from 'utils/request';

const ShoppingCarCard: FC<{
  id: number;
  image: string;
  name: string;
  price: number;
  details?: Array<string>;
  number: number;
  maxNum?: number;
  onSetNewList: () => void;
}> = ({ id, image, name, price, details, number, maxNum, onSetNewList }) => {
  return (
    <div className="shop-shoppingCar-card">
      <Image src={image} fit="fill" />
      <div>
        <div className="shop-shoppingCar-card-name">{name}</div>
        {Boolean(details) && (
          <div className="shop-shoppingCar-card-details">
            +
            {details?.map((item, idx) => (
              <span key={idx}>
                {Boolean(idx) && '/'}
                {item}
              </span>
            ))}
          </div>
        )}
        <div className="shop-shoppingCar-card-price">
          <span>
            ￥<i>{price}</i>
          </span>
          <Stepper
            max={maxNum}
            min={0}
            value={number}
            onChange={(val) => {
              request('mock/test.json', 'PUT', { id: id, number: val }).then((data) => {
                console.log('改变商品数量>>>服务器', data.data.msg);
                data.data.msg === 'ok' && onSetNewList();
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCarCard;
