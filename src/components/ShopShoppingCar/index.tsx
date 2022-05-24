import { memo, FC, useState, useEffect } from 'react';
import { Button, ActionSheet, Popup } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';
import { Outlet, Link } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import './index.less';
import ShoppingCarCard from 'components/ShoppingCarCard';
import request from 'utils/request';

const ShopShoppingCar: FC<{
  onSetShopShoppingCar: () => void;
  shopShoppingCar: any;
}> = ({ onSetShopShoppingCar, shopShoppingCar }) => {
  const [isShowShoppingCar, setIsShowShoppingCar] = useState(false);
  const [height, setHeight] = useState('0');
  // const [shopShoppingCar, onSetShopShoppingCar] = useState<any>({});

  useEffect(() => {
    onSetShopShoppingCar();
  }, []);

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
              包装费 <i>{shopShoppingCar.packing}元</i>
            </span>
          </div>
          <div
            className="nav-right"
            onClick={() =>
              request('mock/test.json', 'GET').then((data) => {
                console.log('清空购物车');
                onSetShopShoppingCar();
                setHeight(`0`);
                setIsShowShoppingCar(false);
              })
            }
          >
            <DeleteOutline />
            &nbsp;清空
          </div>
        </div>
        {shopShoppingCar.list?.length > 0 &&
          shopShoppingCar.list.map((item: any) => (
            <ShoppingCarCard
              key={item.id}
              {...item}
              onSetNewList={() => {
                onSetShopShoppingCar();
                setHeight(`${shopShoppingCar.list?.length * 6}rem`);
              }}
            />
          ))}
      </Popup>

      <footer>
        <Button
          className="shopping-car"
          disabled={!shopShoppingCar.list?.length}
          onClick={() => {
            setIsShowShoppingCar(!isShowShoppingCar);
            setHeight(height === '0' ? `${shopShoppingCar.list?.length * 6}rem` : '0');
          }}
        >
          <RiShoppingBag3Fill
            size={'1.3rem'}
            color={'#fff'}
            style={!shopShoppingCar.list?.length ? { backgroundColor: '#999' } : { backgroundColor: '#209FFA' }}
          />
          <div className="shopping-car-price">
            <div>
              <span className="shopping-car-price-after">
                ￥<i>{shopShoppingCar.after || 0}</i>
              </span>
              <span className="shopping-car-price-before">
                {shopShoppingCar?.before ? '￥' + shopShoppingCar?.before : ''}
              </span>
            </div>
            <div>
              {Boolean(shopShoppingCar?.predict) && (
                <span className="shopping-car-price-estimated">
                  预估到手<i>￥{shopShoppingCar?.predict}</i>
                </span>
              )}
              &nbsp;&nbsp;
              <span>{'预估加配送费' + shopShoppingCar?.delivery || '免配送费'}</span>
            </div>
          </div>
        </Button>

        <Button
          className="checkout"
          shape="rounded"
          disabled={!shopShoppingCar.list?.length}
          style={
            !shopShoppingCar.list?.length || shopShoppingCar.before < shopShoppingCar.minPrice
              ? { backgroundColor: '#999' }
              : { backgroundColor: '#209FFA' }
          }
        >
          {!shopShoppingCar.list?.length && '￥' + shopShoppingCar.minPrice + ' 起送'}
          {shopShoppingCar.before < shopShoppingCar.minPrice &&
            '差￥' + (shopShoppingCar.minPrice - shopShoppingCar.before) + ' 起送'}
          {shopShoppingCar.before >= shopShoppingCar.minPrice && '去结算'}
        </Button>
      </footer>
    </div>
  );
};
export default ShopShoppingCar;
