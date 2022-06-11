import { FC, useState } from 'react';
import { Tag, Image, Divider } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';

const SettlementGoodsCard: FC<{
  isOrder?: boolean;
  image: string;
  name: string;
  number: number;
  price: number;
}> = ({ image, name, number, price, isOrder }) => {
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
        {isOrder ? (
          <>
            <div>
              实付
              <i>￥</i>
              <h3>{price?.toFixed(2)}</h3>
            </div>
            <div style={{ color: '#ccc' }}>￥{(price + Math.random() * 10).toFixed(2)}</div>
          </>
        ) : (
          <>
            <div></div>
            <div>
              <i>￥</i>
              <h3>{price?.toFixed(2)}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default SettlementGoodsCard;
