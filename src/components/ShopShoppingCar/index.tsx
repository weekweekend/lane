import { FC, useState } from 'react';
import { Button, Badge, Popup } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';
import { useSearchParams } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import './index.less';
import ShoppingCarCard from 'components/ShoppingCarCard';
import request from 'utils/request';

const ShopShoppingCar: FC<{
  goodsShoppingCartData: any;
  onSetShopShoppingCartData: (del?: boolean) => any;
}> = ({ goodsShoppingCartData, onSetShopShoppingCartData }) => {
  const [isShowShoppingCar, setIsShowShoppingCar] = useState(false);
  const [height, setHeight] = useState('0');
  const [params] = useSearchParams();
  const shopId = params.get('shopId');

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
              包装费 <i>{goodsShoppingCartData.packing?.toFixed(2)}元</i>
            </span>
          </div>
          <div
            className="nav-right"
            onClick={() =>
              request('get', 'GET').then((data) => {
                console.log('清空购物车 >>> 服务器');
                onSetShopShoppingCartData(true);
                setHeight(`0`);
                setIsShowShoppingCar(false);
              })
            }
          >
            <DeleteOutline />
            &nbsp;清空
          </div>
        </div>
        {goodsShoppingCartData.rows?.length > 0 &&
          goodsShoppingCartData.rows.map((item: any) => (
            <ShoppingCarCard
              key={item.id}
              {...item}
              onSetNewList={async () => {
                const len = await onSetShopShoppingCartData();
                if (len === 1) setHeight(`8rem`);
                else setHeight(`${len * 7}rem`);
              }}
            />
          ))}
      </Popup>

      <footer>
        <Button
          className="shopping-car"
          disabled={!goodsShoppingCartData.rows?.length}
          onClick={() => {
            setIsShowShoppingCar(!isShowShoppingCar);
            setHeight(height === '0' ? `${goodsShoppingCartData.rows?.length * 7}rem` : '0');
          }}
        >
          <Badge
            content={goodsShoppingCartData.rows?.length}
            style={!goodsShoppingCartData.rows?.length ? { display: 'none' } : {}}
          >
            <RiShoppingBag3Fill
              size={'1.3rem'}
              color={'#fff'}
              style={!goodsShoppingCartData.rows?.length ? { backgroundColor: '#999' } : { backgroundColor: '#209FFA' }}
            />
          </Badge>

          <div className="shopping-car-price">
            <div>
              <span className="shopping-car-price-after">
                ￥<i>{goodsShoppingCartData.after?.toFixed(2) || 0}</i>
              </span>
              <span className="shopping-car-price-before">
                {goodsShoppingCartData?.before ? '￥' + goodsShoppingCartData?.before?.toFixed(2) : ''}
              </span>
            </div>
            <div>
              {Boolean(goodsShoppingCartData?.predict) && (
                <span className="shopping-car-price-estimated">
                  预估到手<i>￥{goodsShoppingCartData?.predict?.toFixed(2)}</i>
                </span>
              )}
              &nbsp;&nbsp;
              <span>{'预估加配送费' + goodsShoppingCartData?.delivery?.toFixed(2) || '免配送费'}</span>
            </div>
          </div>
        </Button>

        <Button
          className="checkout"
          shape="rounded"
          disabled={
            !goodsShoppingCartData.rows?.length || goodsShoppingCartData.before < goodsShoppingCartData.minPrice
          }
          onClick={() => {
            window.location.href = `#/shop/settlement?shopId=${encodeURIComponent(shopId || '')}`;
          }}
          style={
            !goodsShoppingCartData.rows?.length || goodsShoppingCartData.before < goodsShoppingCartData.minPrice
              ? { backgroundColor: '#999' }
              : { backgroundColor: '#209FFA' }
          }
        >
          {!goodsShoppingCartData.rows?.length && '￥' + goodsShoppingCartData.minPrice?.toFixed(2) + ' 起送'}
          {goodsShoppingCartData.before < goodsShoppingCartData.minPrice &&
            '差￥' + (goodsShoppingCartData.minPrice - goodsShoppingCartData.before)?.toFixed(1) + ' 起送'}
          {goodsShoppingCartData.before >= goodsShoppingCartData.minPrice && '去结算'}
        </Button>
      </footer>
    </div>
  );
};
export default ShopShoppingCar;
