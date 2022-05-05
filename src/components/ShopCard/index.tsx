import { FC } from 'react';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';

const ShopCard: FC<{
  image?: string;
  imageTag?: string;
  title?: string;
  score?: number;
  monthSale?: number;
  /** 单位分钟 */
  time: number;
  /** 单位米 */
  distance: number;
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
          <CloseOutline fontSize={'0.65rem'} />
        </div>
        <div className="shop-card-content-info  text-desc">
          <div>
            <span className="score">
              {score}
              <i>分&nbsp;&nbsp;</i>
            </span>
            <span>月售{monthSale}</span>
          </div>
          <div>
            <span>{time < 60 ? time + '分钟 ' : Math.floor(time / 60) + '小时 '}&nbsp;</span>
            <span>{distance < 1000 ? distance + 'm' : (distance / 1000).toFixed(1) + 'km'}</span>
          </div>
        </div>
        <div className="shop-card-content-delivery text-desc">
          <span>起送￥{flagFall}&nbsp;&nbsp;</span>
          <span>配送￥{deliveryCost}</span>
        </div>
        <div className="shop-card-content-tags">
          {tags?.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="shop-card-content-discount">
          <div>
            <span>
              {discount?.find((e) => e.name === '活动')?.tag?.[0]}
              <i> </i>
              {discount?.find((e) => e.name === '活动')?.tag?.[1]}
            </span>
            <span className="dis-vip">{discount?.find((e) => e.name === '红包')?.tag?.[0]}</span>
          </div>
          <DownOutline fontSize={'0.5rem'} />
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
