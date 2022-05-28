import React, { memo, FC, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Button, Badge, Popup } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';
import { Outlet, Link } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import './index.less';
import ShoppingCarCard from 'components/ShoppingCarCard';
import request from 'utils/request';
// import { ShoppingCartContext } from '../../pages/Shop';

const ShopShoppingCar: FC<{
  goodsShoppingCartData: any;
  onSetShopShoppingCartData: () => void;
}> = ({ goodsShoppingCartData, onSetShopShoppingCartData }) => {
  const [isShowShoppingCar, setIsShowShoppingCar] = useState(false);
  const [height, setHeight] = useState('0');
  const shopId = new URLSearchParams(window.location.hash.split('?')[1]).get('shopId');
  return (
    <div className="Shop-Shopping-Car">
      <Popup
        className="shopping-car-popup"
        bodyStyle={{ height: height }}
        visible={isShowShoppingCar}
        onMaskClick={() => {
          setIsShowShoppingCar(false);
          setHeight('0');
        }}
      >
        <div className="nav">
          <div className="nav-left">
            已选商品
            <span>
              包装费 <i>{goodsShoppingCartData.packing}元</i>
            </span>
          </div>
          <div
            className="nav-right"
            onClick={() =>
              request('mock/test.json', 'GET').then((data) => {
                console.log('清空购物车 >>> 服务器');
                onSetShopShoppingCartData();
                setHeight(`0`);
                setIsShowShoppingCar(false);
              })
            }
          >
            <DeleteOutline />
            &nbsp;清空
          </div>
        </div>
        {goodsShoppingCartData.list?.length > 0 &&
          goodsShoppingCartData.list.map((item: any) => (
            <ShoppingCarCard
              key={item.id}
              {...item}
              onSetNewList={() => {
                onSetShopShoppingCartData();
                request('mock/getShopShoppingCar.json', 'GET').then((data) =>
                  setHeight(`${data.data.list?.length * 6}rem`),
                );
              }}
            />
          ))}
      </Popup>

      <footer>
        <Button
          className="shopping-car"
          disabled={!goodsShoppingCartData.list?.length}
          onClick={() => {
            setIsShowShoppingCar(!isShowShoppingCar);
            setHeight(height === '0' ? `${goodsShoppingCartData.list?.length * 6}rem` : '0');
          }}
        >
          <Badge
            content={goodsShoppingCartData.list?.length}
            style={!goodsShoppingCartData.list?.length ? { display: 'none' } : {}}
          >
            <RiShoppingBag3Fill
              size={'1.3rem'}
              color={'#fff'}
              style={!goodsShoppingCartData.list?.length ? { backgroundColor: '#999' } : { backgroundColor: '#209FFA' }}
            />
          </Badge>

          <div className="shopping-car-price">
            <div>
              <span className="shopping-car-price-after">
                ￥<i>{goodsShoppingCartData.after || 0}</i>
              </span>
              <span className="shopping-car-price-before">
                {goodsShoppingCartData?.before ? '￥' + goodsShoppingCartData?.before : ''}
              </span>
            </div>
            <div>
              {Boolean(goodsShoppingCartData?.predict) && (
                <span className="shopping-car-price-estimated">
                  预估到手<i>￥{goodsShoppingCartData?.predict}</i>
                </span>
              )}
              &nbsp;&nbsp;
              <span>{'预估加配送费' + goodsShoppingCartData?.delivery || '免配送费'}</span>
            </div>
          </div>
        </Button>

        <Button
          className="checkout"
          shape="rounded"
          disabled={!goodsShoppingCartData.list?.length}
          onClick={() => (window.location.href = `#/shop/settlement?shopId=${encodeURIComponent(shopId || '')}`)}
          style={
            !goodsShoppingCartData.list?.length || goodsShoppingCartData.before < goodsShoppingCartData.minPrice
              ? { backgroundColor: '#999' }
              : { backgroundColor: '#209FFA' }
          }
        >
          {!goodsShoppingCartData.list?.length && '￥' + goodsShoppingCartData.minPrice + ' 起送'}
          {goodsShoppingCartData.before < goodsShoppingCartData.minPrice &&
            '差￥' + (goodsShoppingCartData.minPrice - goodsShoppingCartData.before) + ' 起送'}
          {goodsShoppingCartData.before >= goodsShoppingCartData.minPrice && '去结算'}
        </Button>
      </footer>
    </div>
  );
};
export default ShopShoppingCar;
