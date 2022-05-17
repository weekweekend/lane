import { Button, Popup, SearchBar, Tabs, Swiper, Divider, NavBar, Space, Toast, Popover, Image } from 'antd-mobile';
import { RightOutline, SearchOutline, MoreOutline, HeartOutline, HeartFill, LeftOutline } from 'antd-mobile-icons';
import { useState, useEffect, useRef } from 'react';
import './index.less';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
import SideBar from 'components/SideBar';
import { Action } from 'antd-mobile/es/components/popover';
import { RiShoppingCart2Line } from 'react-icons/ri';

const tabItems = [
  { key: 'order', title: '点餐' },
  { key: 'evaluate', title: '评价' },
  { key: 'shop', title: '商家' },
];

const actions: Action[] = [{ key: 'shopCar', icon: <RiShoppingCart2Line />, text: '购物车' }];

const Shop = () => {
  const [shopName, setShopName] = useState('');
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [scroll, setScroll] = useState(0);

  window.addEventListener('scroll', (e) => {
    setScroll(window.scrollY);
    console.log(e.target === document);
  });
  useEffect(() => {
    const name: string = new URLSearchParams(window.location.hash.split('?')[1])?.get('shopName') || '';
    setShopName(name);
  }, []);

  const back = () => window.history.go(-1);
  const onFocus = () => {
    const tmp = isFocus;
    setIsFocus(!isFocus);
    if (tmp)
      Toast.show({
        content: '取消关注成功',
      });
    else
      Toast.show({
        content: '关注成功',
      });
  };
  const onMore = () => setIsShowMore(!isShowMore);
  return (
    <>
      <div className="shop-bgi" />
      <div className="shop-main">
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
                <a href="#/shop/recommended">
                  <div className="ad-image"></div>
                </a>
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
          <Image
            src={
              'https://img.alicdn.com/imgextra/i2/2209448391393/O1CN01AtKE031MA2MFx2F8n_!!2209448391393-0-koubei.jpg_400x400Q85s50.jpg'
            }
            width="100%"
            fit="cover"
            style={{ borderRadius: 4 }}
          />
        </div>
        <div className="shop-board-discount">
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
      <div
        className="shop-nav"
        style={{
          backgroundColor: `rgba(255,255,255,${scroll / 300})`,
          color: `rgb(${255 - scroll / 2},${255 - scroll / 2},${255 - scroll / 2})`,
        }}
      >
        <div className="shop-nav-left">
          <LeftOutline onClick={() => window.history.go(-1)} />
        </div>
        <div className="shop-nav-right">
          <div>
            <SearchOutline onClick={() => (window.location.href = '#/shop/shopSearch')} />
          </div>
          <div className="shop-focus">
            {isFocus && (
              <div>
                <HeartFill color="red" onClick={onFocus} />
                <span>已关注</span>
              </div>
            )}
            {!isFocus && (
              <div>
                <HeartOutline onClick={onFocus} />
                <span>关注</span>
              </div>
            )}
          </div>
          <div>
            <MoreOutline onClick={onMore} />
            <a href="#/shoppingCar" className="shop-nav-more" style={isShowMore ? { opacity: '1' } : { opacity: '0' }}>
              <div className="shop-nav-more-content">
                <RiShoppingCart2Line />
                购物车
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Shop;
