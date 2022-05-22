import { FC, useState } from 'react';
import { Tag, Image, Divider } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';

const ShopCard: FC<{
  id: number;
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
  goods?: Array<{
    name: string;
    img: string;
    price: number;
  }>;
}> = ({
  id,
  image,
  imageTag,
  title,
  score,
  monthSale,
  time,
  distance,
  flagFall,
  deliveryCost,
  deliveryDiscount,
  tags,
  discount,
  goods,
}) => {
  const [isShowShopCard, setIsShowShopCard] = useState(true);

  const target = `#/shop?shopId=${encodeURIComponent(id)}`;
  return (
    <a href={target} className="shop-card" style={isShowShopCard ? { display: 'flex' } : { display: 'none' }}>
      <div className="shop-card-image" style={goods ? { flex: 1 } : { flex: 2 }}>
        <Image src={image} alt="店铺图片" />
        {imageTag && (
          <span className="img-tag">
            {imageTag}
            <span></span>
          </span>
        )}
      </div>
      <div className="shop-card-content">
        <div className="shop-card-content-title">
          <h3>{title}</h3>
          {goods ? (
            ''
          ) : (
            <CloseOutline
              fontSize={'0.65rem'}
              onClick={(e) => {
                e.preventDefault();
                setIsShowShopCard(false);
              }}
            />
          )}
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
          {!deliveryDiscount && <span>配送￥{deliveryCost}</span>}
          {deliveryDiscount && <span style={{ color: 'orangered' }}>免配送费</span>}
        </div>
        {goods ? (
          ''
        ) : (
          <div className="shop-card-content-tags">
            {tags?.map((item, idx) => (
              <Tag key={'tag' && id && idx} color="#fef0e5">
                {item}
              </Tag>
            ))}
          </div>
        )}
        <div className="shop-card-content-discount">
          <span>
            {discount
              ?.find((e) => e.name === '活动')
              ?.tag?.map((item, idx) => {
                if (idx && idx < 2)
                  return (
                    <i key={'hd' && id && idx}>
                      <Divider direction="vertical" />
                      {item}
                    </i>
                  );
                else if (idx < 2) return item;
              })}
          </span>
          {discount
            ?.find((e) => e.name === '红包')
            ?.tag?.map((item, idx) => {
              if (idx < 2)
                return (
                  <Tag key={'hb' && id && idx} color="#ae6c28" fill="outline" className="dis-vip">
                    {item}
                  </Tag>
                );
            })}
          {discount
            ?.find((e) => e.name === '服务')
            ?.tag?.map((item, idx) => {
              if (idx < 2)
                return (
                  <Tag key={'fw' && id && idx} color="#eee" fill="outline">
                    {item}
                  </Tag>
                );
            })}
        </div>
        {goods ? (
          <div className="shop-card-content-search">
            {goods.map((item, idx) => (
              <div key={idx}>
                <Image src={item.img} />
                <span>{item.name}</span>
                <span style={{ color: 'orangered' }}>
                  <i>￥</i>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </a>
  );
};

export default ShopCard;
