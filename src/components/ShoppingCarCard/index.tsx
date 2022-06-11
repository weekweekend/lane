import { FC } from 'react';
import { Image, Stepper } from 'antd-mobile';
import './index.less';
import request from 'utils/request';

const ShoppingCarCard: FC<{
  id: number;
  image: string;
  name: string;
  price: number;
  details?: Array<string>;
  hasDetails: boolean;
  number: number;
  maxNum?: number;
  onSetNewList: () => void;
}> = ({ id, image, name, price, details, hasDetails, number, maxNum, onSetNewList }) => {
  return (
    <div className="shop-shoppingCar-card">
      <Image src={image} fit="fill" />
      <div>
        <div className="shop-shoppingCar-card-name">{name}</div>
        {hasDetails && (
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
            ￥<i>{price?.toFixed(2)}</i>
          </span>
          <Stepper
            max={maxNum}
            min={0}
            value={number}
            onChange={(val) => {
              request('put', 'PUT', { id: id, number: val }).then((data) => {
                console.log('改变商品数量>>>服务器');
                data.success && onSetNewList();
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCarCard;
