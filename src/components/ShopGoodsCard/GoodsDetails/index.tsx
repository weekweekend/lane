import { Button, Popup, Tag, Tabs, Swiper, Divider, Rate, Space, Toast, Selector, Image } from 'antd-mobile';
import {
  RightOutline,
  SearchOutline,
  MoreOutline,
  HeartOutline,
  HeartFill,
  LeftOutline,
  PhoneFill,
  EnvironmentOutline,
} from 'antd-mobile-icons';
import { useState, useEffect, useRef, FC } from 'react';
import './index.less';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
import GoodsContent from 'components/GoodsContent';
import { Action } from 'antd-mobile/es/components/popover';
import { RiMedalFill } from 'react-icons/ri';
import ShopEvaluateCard from 'components/ShopEvaluateCard';
import request from 'utils/request';
import ShopShoppingCar from 'components/ShopShoppingCar';

const GoodsDetails: FC<{
  onCloseDetails: () => void;
  goodsId: number;
  goodsShoppingCartData: any;
  onSetShopShoppingCartData: () => void;
}> = ({ onCloseDetails, goodsId, goodsShoppingCartData, onSetShopShoppingCartData }) => {
  const [goodsDetails, setGoodsDetails] = useState<any>({});
  const [goodsDetailShoppingCart, setGoodsDetailShoppingCart] = useState<any>({});
  // const goodsId = new URLSearchParams(window.location.href.split('?')[0]).get('goodsId');

  useEffect(() => {
    request('mock/getGoodsDetails.json', 'GET', { goodsId: goodsId }).then((data) => {
      setGoodsDetails(data.data);
      console.log('获取商品详情<<<服务器');
    });
    request('mock/getShopShoppingCar.json', 'GET', { goodsId: goodsId }).then((data) => {
      setGoodsDetailShoppingCart(data.data);
      console.log('获取详情页购物车信息<<<服务器');
    });
  }, []);

  return (
    <div className="goods-details">
      <Image src={goodsDetails.image} fit="cover" />
      <LeftOutline onClick={onCloseDetails} />
      <div className="goods-details-des">
        <h2>{goodsDetails.name}</h2>
        {goodsDetails.tag && (
          <span className="goods-details-des-tag">
            <RiMedalFill />
            {goodsDetails.tag}
          </span>
        )}
        <span>月售 {goodsDetails.monthSale}</span>
        <div>
          <div>
            <span className="goods-details-des-price">
              ￥<i>{goodsDetails.price} </i>
            </span>
            <span>包装费￥{goodsDetails.packing}/份</span>
          </div>
          <Button
            color="primary"
            shape="rounded"
            onClick={() => {
              request('mock/test.json', 'PUT', { goodsId: goodsId }).then((data) => {
                console.log('商品详情加购 >>> 服务器');
                onSetShopShoppingCartData();
              });
            }}
          >
            +加入购物车
          </Button>
        </div>
      </div>
      <div className="goods-details-details">
        <h3>商品详情</h3>
        {goodsDetails.details?.map((item: any, idx: number) => (
          <div key={idx}>
            <span>{item.name}</span>
            <span>
              {item.des.map((ele: any, i: number) => (
                <span key={i}>{ele}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <ShopShoppingCar
        goodsShoppingCartData={goodsShoppingCartData}
        onSetShopShoppingCartData={onSetShopShoppingCartData}
      />
    </div>
  );
};
export default GoodsDetails;
