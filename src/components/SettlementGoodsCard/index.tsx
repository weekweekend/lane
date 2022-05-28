import { FC, useState } from 'react';
import { Tag, Image, Divider } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';

const SettlementGoodsCard: FC<{
  image: string;
  name: string;
  number: number;
  price: number;
}> = ({ image, name, number, price }) => {
  return (
    <div className="settlement-goods-card">
      <div className="settlement-goods-card-left">
        <Image src={image} />
        <div>
          <span className="name">{name}</span>
          <span className="number">x{number}</span>
        </div>
      </div>
      <div className="settlement-goods-card-right">
        <i>￥</i>
        {price}
      </div>
    </div>
  );
};
export default SettlementGoodsCard;
