import { Button, Popup, SearchBar, Tabs, Swiper, Divider } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import { useState, useEffect, useRef } from 'react';
import './index.less';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
import SideBar from 'components/SideBar';

const tabItems = [
  { key: 'order', title: '点餐' },
  { key: 'evaluate', title: '评价' },
  { key: 'shop', title: '商家' },
];
const Shop = () => {
  const [shopName, setShopName] = useState('');
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const name: string = new URLSearchParams(window.location.hash.split('?')[1])?.get('shopName') || '';
    setShopName(name);
  }, []);
  return (
    <>
      <div className="shop-bgi"></div>
      <div className="shop-main">
        <div className="shop-board">
          <div className="shop-board-msg">
            <div className="shop-board-msg-title">
              <h2>江湖烧烤烧烤</h2>
              <div>
                <span>4.9分</span>
                <span>蓝骑士专送</span>
                <span>约55分钟</span>
                <span>·</span>
                <span>月售1233</span>
              </div>
            </div>
            <div className="shop-board-msg-img"></div>
          </div>
          <div className="shop-board-discount">
            <div className="shop-board-discount-notice">
              公告：这里是公告这里是公告这里是公告这里是公告这里是公告这里是公告这里是公告
            </div>
            <div>
              <div className="shop-board-hongbao-vip">
                <span>￥8无门槛</span>
                <span>兑</span>
              </div>
              <div className="shop-board-hongbao-shop">
                <span>￥3</span>
                <span>兑</span>
              </div>
            </div>
            <div className="shop-board-discount-shop">
              <div>
                <span>28减4</span>
                <Divider direction="vertical" />
                <span>49减5</span>
                <Divider direction="vertical" />
                <span>100减13</span>
              </div>
              <div>首次光临减1</div>
            </div>
          </div>
        </div>
        <div className="shop-main-nav">
          <Tabs
            activeKey={tabItems[activeIndex].key}
            onChange={(key) => {
              const index = tabItems.findIndex((item) => item.key === key);
              setActiveIndex(index);
              swiperRef.current?.swipeTo(index);
            }}
          >
            {tabItems.map((item) => (
              <Tabs.Tab title={item.title} key={item.key} />
            ))}
          </Tabs>
          <Swiper
            direction="horizontal"
            loop
            indicator={() => null}
            ref={swiperRef}
            defaultIndex={activeIndex}
            onIndexChange={(index) => {
              setActiveIndex(index);
            }}
          >
            <Swiper.Item>
              <div className="shop-main-content">
                <div className="ad-image"></div>
                <div>
                  <a href="#/shop/recommended" className="ad-recommended">
                    <span>商家推荐</span>
                    <RightOutline />
                  </a>
                  <div className="ad-goods">
                    <div>推荐1</div>
                    <div>推荐2</div>
                    <div>推荐3</div>
                  </div>
                </div>
                <div className="order-content">
                  <SideBar />
                  {/* <div className="content-category">left</div>
                  <div className="content-goods">right</div> */}
                </div>
              </div>
            </Swiper.Item>
            <Swiper.Item>
              <div>西红柿</div>
            </Swiper.Item>
            <Swiper.Item>
              <div>蚂蚁</div>
            </Swiper.Item>
          </Swiper>
          {/* <Button color="primary" fill="outline" shape="rounded" size="mini">
            好友拼单
          </Button> */}
        </div>
      </div>
    </>
  );
};
export default Shop;
