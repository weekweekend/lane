import { FC } from 'react';
import { Image } from 'antd-mobile';
import './index.less';

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
