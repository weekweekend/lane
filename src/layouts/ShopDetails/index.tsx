import { memo, FC, useState } from 'react';
import { Button, ActionSheet, Popup } from 'antd-mobile';
import { Outlet, Link } from 'react-router-dom';
import { RiHome5Line, RiCake3Fill, RiEmotion2Line, RiFileList2Line, RiShoppingBag3Fill } from 'react-icons/ri';
import './index.less';
const ShopDetails: FC<{}> = () => {
  const [isShowShoppingCar, setIsShowShoppingCar] = useState(false);
  const [height, setHeight] = useState('0');

  return (
    <div className="ShopDetails">
      {/* <header>123</header> */}

      <main style={{ position: 'relative' }}>
        <Outlet></Outlet>
        <Popup
          className="shopping-car-popup"
          bodyStyle={{ height: height }}
          visible={isShowShoppingCar}
          onMaskClick={() => {
            setIsShowShoppingCar(false);
            setHeight('0');
          }}
        >
          {'mockContent'}
        </Popup>
      </main>

      <footer>
        <Button
          className="shopping-car"
          onClick={() => {
            setIsShowShoppingCar(!isShowShoppingCar);
            setHeight(height === '0' ? '100px' : '0');
          }}
        >
          <RiShoppingBag3Fill size={'1.2rem'} color={'#fff'} />
          <div className="shopping-car-price">
            <div>
              <span className="shopping-car-price-after">
                ￥<i>65</i>
              </span>
              <span className="shopping-car-price-before">￥70</span>
            </div>
            <div>
              <span className="shopping-car-price-estimated">
                预估到手<i>￥23</i>
              </span>
              &nbsp;&nbsp;
              <span>免配送费</span>
            </div>
          </div>
        </Button>
        <Button className="checkout" shape="rounded">
          去结算
        </Button>
      </footer>
    </div>
  );
};
export default memo(ShopDetails);
