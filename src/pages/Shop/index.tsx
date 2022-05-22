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
import { useState, useEffect, useRef } from 'react';
import './index.less';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
import GoodsContent from 'components/GoodsContent';
import { Action } from 'antd-mobile/es/components/popover';
import { RiShoppingCart2Line } from 'react-icons/ri';
import ShopEvaluateCard from 'components/ShopEvaluateCard';
import request from 'utils/request';

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
  const [shopScroll, setShopScroll] = useState(0);
  const [evaluateCurTag, setEvaluateCurTag] = useState('1');
  const [shopEvaluateList, setShopEvaluateList] = useState<Array<any>>([]);
  const [shopIntro, setShopIntro] = useState<any>({});

  const shopId = new URLSearchParams(window.location.hash.split('?')[1]).get('shopId');

  useEffect(() => {
    const name: string = new URLSearchParams(window.location.hash.split('?')[1])?.get('shopName') || '';
    setShopName(name);
    window.addEventListener('scroll', (e) => {
      setShopScroll(window.scrollY);
    });
    request('mock/getEvaluate.json', 'GET', { shopId: shopId }).then((data) => setShopEvaluateList(data.data));
    request('mock/getShopIntro.json', 'GET', { shopId: shopId }).then((data) => setShopIntro(data.data));
    return removeEventListener('scroll', (e) => {
      setShopScroll(window.scrollY);
    });
  }, [shopId]);

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
            <Swiper.Item className="shop-main-content">
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
                <GoodsContent id={shopId || ''} />
              </div>
            </Swiper.Item>
            <Swiper.Item className="shop-main-evaluate">
              <div className="evaluate-summary">
                <div className="evaluate-score">
                  <div>
                    <h1>4.9</h1>
                    <span>
                      高于附近0.00%的商家
                      <Rate readOnly value={4.9} />
                    </span>
                  </div>
                  <div>
                    <span>
                      味道 <strong>4.9</strong>
                    </span>
                    <span>
                      包装<strong>4.9</strong>
                    </span>
                    <span>
                      配送满意度<strong>93%</strong>
                    </span>
                  </div>
                </div>
                <Selector
                  className="evaluate-tags"
                  showCheckMark={false}
                  options={[
                    {
                      label: '全部',
                      value: '1',
                    },
                    {
                      label: '好评',
                      value: '2',
                    },
                    {
                      label: '最新',
                      value: '3',
                    },
                    {
                      label: '最近差评',
                      value: '4',
                    },
                    {
                      label: '回头客评价',
                      value: '5',
                    },
                  ]}
                  value={[evaluateCurTag]}
                  onChange={(v) => {
                    if (v.length) {
                      setEvaluateCurTag(v[0]);
                    }
                  }}
                />
              </div>
              <div className="evaluate-content">
                {shopEvaluateList.map((item) => (
                  <ShopEvaluateCard key={item.id} {...item} />
                ))}
                <Divider>暂无更多评价</Divider>
              </div>
            </Swiper.Item>
            <Swiper.Item className="shop-main-intro">
              <div>
                <div className="intro-shop">
                  <h3>{shopIntro.name}</h3>
                  <span>
                    <EnvironmentOutline />
                    &nbsp; {shopIntro.position}
                  </span>
                </div>
                <div className="intro-img">
                  {shopIntro.image?.map((item: string, idx: number) => (
                    <Image key={idx} src={item} />
                  ))}
                </div>
                <div className="intro-msg">
                  <h3>商家信息</h3>
                  <div>商家品类：{shopIntro.type}</div>
                  <div>
                    营业时间：
                    {shopIntro.time?.map((item: string, idx: number) => (
                      <span key={idx}>{item}&nbsp;</span>
                    ))}
                  </div>
                </div>
                <div className="intro-service">
                  <h3>商家服务</h3>
                  {shopIntro.service?.map((item: any, idx: number) => (
                    <div key={idx}>
                      <Tag color="#999" fill="outline">
                        {item.name}
                      </Tag>
                      &nbsp;&nbsp;
                      <span>{item.content}</span>
                    </div>
                  ))}
                </div>
                <div className="shop-phone">
                  <h3>商家热线</h3>
                  {shopIntro.phone}
                </div>
              </div>
            </Swiper.Item>
          </Swiper>
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
          <div></div>
        </div>
      </div>
      <div
        className="shop-nav"
        style={{
          backgroundColor: `rgba(255,255,255,${shopScroll / 200})`,
          color: `rgb(${255 - shopScroll},${255 - shopScroll},${255 - shopScroll})`,
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
