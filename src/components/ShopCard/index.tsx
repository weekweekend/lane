import { FC, useState } from 'react';
import { Tag, Image, Divider } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';

const ShopCard: FC<{
  image?: string;
  imageTag?: string;
  title: string;
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
  const [isShowShopCard, setIsShowShopCard] = useState(true);

  const target = `shop?shopName=${encodeURIComponent(title)}`;
  return (
    <Link to={target} className="shop-card" style={isShowShopCard ? { display: 'flex' } : { display: 'none' }}>
      <div className="shop-card-image">
        <Image src={image} alt="店铺图片" />
        <span>{imageTag}</span>
      </div>
      <div className="shop-card-content">
        <div className="shop-card-content-title">
          <h3>{title}</h3>
          <CloseOutline
            fontSize={'0.65rem'}
            onClick={(e) => {
              e.preventDefault();
              setIsShowShopCard(false);
            }}
          />
        </div>
        <div className="shop-card-content-info  text-desc">
          <div>
            <span className="score">
              <strong>{score}</strong>
              分&nbsp;&nbsp;
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
            <Tag key={item} color="#fef0e5">
              {item}
            </Tag>
          ))}
        </div>
        <div className="shop-card-content-discount">
          <div>
            <span>
              {discount?.find((e) => e.name === '活动')?.tag?.[0]}
              <Divider direction="vertical" />
              {discount?.find((e) => e.name === '活动')?.tag?.[1]}
            </span>
            <Tag color="#ae6c28" fill="outline" className="dis-vip">
              {discount?.find((e) => e.name === '红包')?.tag?.[0]}
            </Tag>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
