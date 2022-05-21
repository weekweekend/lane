import { FC, useState } from 'react';
import { Image, Button, Popup } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';
import ShopGoodsDetailsCard from './ShopGoodsDetailsCard';

const ShopGoodsCard: FC<{
  id: number;
  image?: string;
  title: string;
  tag?: string;
  rowMaterial: Array<string>;
  mSales: number;
  praised: number;
  price: number;
}> = ({ id, image, title, tag, rowMaterial, mSales, price, praised }) => {
  const [isShowGoodsChoose, setIsShowGoodsChoose] = useState(false);

  const target = `#/shop/goodsDetails?goodsId=${encodeURIComponent(id)}`;

  return (
    <div className="goods-card" onClick={() => (window.location.href = target)}>
      <div className="goods-card-left">
        <Image src={image} width="100%" fit="cover" style={{ borderRadius: '.2rem' }} />
      </div>
      <div className="goods-card-right">
        <div className="goods-card-right-title">{title}</div>
        <div className="goods-card-right-tag">
          <BiMedal color="#e67e29" />
          销量第一
        </div>
        <div style={{ color: '#999' }}>
          <div>
            原料：
            {rowMaterial.map((item, idx) => (
              <span key={Math.random()}>{idx ? ', ' + item : item}</span>
            ))}
          </div>
        </div>
        <div className="goods-card-right-sales">
          <div>月售 {mSales}</div>
          <div>好评率 {praised * 100}%</div>
        </div>
        <div className="goods-card-right-price">
          <span>￥{price}</span>
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
            <ShopGoodsDetailsCard onClose={() => setIsShowGoodsChoose(false)} />
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default ShopGoodsCard;
