import { FC, useState } from 'react';
import { Image, Button, Popup, Stepper } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';
import ShopGoodsDetailsCard from './ShopGoodsDetailsCard';

const ShopGoodsCard: FC<{
  id: number;
  image: string;
  title: string;
  tag?: string;
  raw: Array<string>;
  monthSale: number;
  likeRate: number;
  price: number;
  minNum?: number;
  maxNum?: number;
  details?: Array<{
    id: number;
    name: string;
    params: Array<string>;
  }>;
}> = ({ id, image, title, tag, raw, monthSale, price, likeRate, minNum, maxNum, details }) => {
  const [isShowGoodsChoose, setIsShowGoodsChoose] = useState(false);

  const target = `#/shop/goodsDetails?goodsId=${encodeURIComponent(id)}`;

  return (
    <div className="goods-card" onClick={() => (window.location.href = target)}>
      <div className="goods-card-left">
        <Image src={image} width="100%" fit="cover" style={{ borderRadius: '.2rem' }} />
      </div>
      <div className="goods-card-right">
        <div className="goods-card-right-title">{title}</div>
        {tag ? (
          <div className="goods-card-right-tag">
            <BiMedal color="#e67e29" />
            {tag}
          </div>
        ) : (
          ''
        )}

        <div style={{ color: '#999' }}>
          <div>
            原料：
            {raw.map((item, idx) => (
              <span key={Math.random()}>{idx ? ', ' + item : item}</span>
            ))}
          </div>
        </div>
        <div className="goods-card-right-sales">
          <div>月售 {monthSale}</div>
          <div>好评率 {likeRate}%</div>
        </div>
        <div className="goods-card-right-price">
          <span>￥{price}</span>
          {details ? (
            <Button
              color="primary"
              shape="rounded"
              size="mini"
              onClick={(e) => {
                e.stopPropagation();
                setIsShowGoodsChoose(true);
              }}
            >
              选规格
            </Button>
          ) : (
            <div onClick={(e) => e.stopPropagation()}>
              <Stepper min={minNum || 0} max={maxNum} />
            </div>
          )}
          <Popup
            className="goods-choose-popup"
            visible={isShowGoodsChoose}
            onMaskClick={() => {
              setIsShowGoodsChoose(false);
            }}
            bodyStyle={{
              borderTopLeftRadius: '.5rem',
              borderTopRightRadius: '.5rem',
              minHeight: '80vh',
            }}
          >
            <ShopGoodsDetailsCard
              onClose={() => setIsShowGoodsChoose(false)}
              details={details}
              title={title}
              image={image}
              price={price}
              minNum={minNum}
              maxNum={maxNum}
            />
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default ShopGoodsCard;
