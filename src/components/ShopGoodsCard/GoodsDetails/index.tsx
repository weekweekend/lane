import { Button, Popup, Stepper, Image } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import { useState, useEffect, FC } from 'react';
import { IoIosAddCircle, IoIosRemoveCircleOutline } from 'react-icons/io';

import './index.less';
import { RiMedalFill } from 'react-icons/ri';
import request from 'utils/request';
import ShopShoppingCar from 'components/ShopShoppingCar';
import ShopGoodsSelectCard from '../ShopGoodsSelectCard';

const GoodsDetails: FC<{
  onCloseDetails: () => void;
  goodsId: number;
  goodsShoppingCartData: any;
  onSetShopShoppingCartData: () => void;
  onGoodNumChange: (val: number) => void;
  curNum: number;
  minNum?: number;
  maxNum?: number;
  hasDetails: boolean;
  details?: Array<{
    id: number;
    name: string;
    params: Array<string>;
  }>;
  setCurNum: (val: number) => void;
  image: string;
  title: string;
  price: number;
}> = ({
  onCloseDetails,
  goodsId,
  goodsShoppingCartData,
  onSetShopShoppingCartData,
  minNum,
  maxNum,
  curNum,
  setCurNum,
  details,
  hasDetails,
  onGoodNumChange,
  image,
  title,
  price,
}) => {
  const [goodsDetails, setGoodsDetails] = useState<any>({});
  const [goodsDetailShoppingCart, setGoodsDetailShoppingCart] = useState<any>({});
  const [isShowSelect, setIsShowSelect] = useState(false);

  useEffect(() => {
    request('goodsDetails', 'GET', { goodsId: goodsId }).then((data) => {
      setGoodsDetails(data.data);
      console.log('获取商品详情<<<服务器');
    });
    request('shopShoppingCar', 'GET', { goodsId: goodsId }).then((data) => {
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
              ￥<i>{goodsDetails.price?.toFixed(2)} </i>
            </span>
            <span>包装费￥{goodsDetails.packing?.toFixed(2)}/份</span>
          </div>

          {curNum === 0 && hasDetails && (
            <Button
              color="primary"
              shape="rounded"
              onClick={() => {
                if (details) setIsShowSelect(true);
                else {
                  request('put', 'PUT', { goodsId: goodsId }).then((data) => {
                    console.log('商品详情加购 >>> 服务器');
                    onSetShopShoppingCartData();
                  });
                  setCurNum(curNum + 1);
                }
              }}
            >
              +加入购物车
            </Button>
          )}
          {curNum > 0 && hasDetails && (
            <div className="details-stepper">
              <IoIosRemoveCircleOutline color="#209FFA" onClick={() => setCurNum(curNum - 1)} />

              <span>{curNum}</span>
              <IoIosAddCircle color="#209FFA" onClick={() => setIsShowSelect(true)} />
            </div>
          )}
          {!hasDetails && (
            <div onClick={(e) => e.stopPropagation()}>
              <Stepper
                min={minNum || 0}
                max={maxNum}
                value={curNum}
                onChange={onGoodNumChange}
                className={curNum > 0 ? '' : 'stepper-activate'}
              />
            </div>
          )}
          <Popup
            className="goods-choose-popup"
            visible={isShowSelect}
            onMaskClick={() => {
              setIsShowSelect(false);
            }}
            bodyStyle={{
              borderTopLeftRadius: '.5rem',
              borderTopRightRadius: '.5rem',
              height: '80vh',
            }}
          >
            <div className="goods-details-popup">
              <ShopGoodsSelectCard
                onClose={() => setIsShowSelect(false)}
                details={details}
                title={title}
                image={image}
                price={price}
                minNum={minNum}
                maxNum={maxNum}
                onSetShopShoppingCartData={onSetShopShoppingCartData}
                setCurNum={(val: number) => setCurNum(val)}
                curNum={curNum}
              />
            </div>
          </Popup>
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
