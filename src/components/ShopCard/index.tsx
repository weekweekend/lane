import { FC } from 'react';
import { CloseOutline } from 'antd-mobile-icons';
import './index.less';

const ShopCard: FC<{
  image?: string;
  imageTag?: string;
  title?: string;
  score?: number;
  monthSale?: number;
  /** 单位分钟 */
  time?: number;
  /** 单位米 */
  distance?: number;
  flagFall?: number;
  deliveryCost?: number;
  deliveryDiscount?: boolean;
  tags?: Array<string>; // string[]
  discount?: Array<{
    name?: '活动' | '红包' | '服务';
    tag?: Array<string>;
  }>;
}> = ({ image, imageTag, title, score, monthSale, time, distance, flagFall, deliveryCost, tags, discount }) => {
  return (
    <div className="shop-card">
      <div className="shop-card-image">
        <img src={image} alt="店铺图片" />
        <span>{imageTag}</span>
      </div>
      <div className="shop-card-content">
        <div className="shop-card-content-title">
          <h3>{title}</h3>
          <CloseOutline />
        </div>
        <div className="shop-card-content-shopmsg">
          <div>
            <span>{score}</span>
            <span>{monthSale}</span>
          </div>
          <div>
            <span>{time}</span>
            <span>{distance}</span>
          </div>
        </div>
        <div className="shop-card-content-delivery">
          <span>{flagFall}</span>
          <span>{deliveryCost}</span>
        </div>
        <div className="shop-card-content-tags">
          {tags?.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="shop-card-content-discount">
          <span>{discount?.[0]?.tag?.[0]}</span>
          <span>{discount?.[1]?.tag?.[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
