import { Tag, Tabs, Swiper, Divider, Rate, Toast, Selector, Image, InfiniteScroll } from 'antd-mobile';
import { HeartOutline, HeartFill, LeftOutline, EnvironmentOutline } from 'antd-mobile-icons';
import { useState, useEffect, useRef } from 'react';
import './index.less';
import { SwiperRef } from 'antd-mobile/es/components/swiper';
import GoodsContent from 'components/GoodsContent';
import { Action } from 'antd-mobile/es/components/popover';
import { RiShoppingCart2Line } from 'react-icons/ri';
import ShopEvaluationCard from 'components/ShopEvaluationCard';
import request from 'utils/request';
import { useSearchParams } from 'react-router-dom';
import ShopShoppingCar from 'components/ShopShoppingCar';
import sleep from 'utils/sleep';

const tabItems = [
  { key: 'order', title: '点餐' },
  { key: 'evaluation', title: '评价' },
  { key: 'shop', title: '商家' },
];

const actions: Action[] = [{ key: 'shopCar', icon: <RiShoppingCart2Line />, text: '购物车' }];

const Shop = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [shopScroll, setShopScroll] = useState(0);
  const [evaluationCurTag, setEvaluationCurTag] = useState('1');
  const [shopEvaluationList, setShopEvaluationList] = useState<Array<any>>([]);
  const [shopScore, setShopScore] = useState<any>();
  const [shopIntro, setShopIntro] = useState<any>({});
  const [goodsShoppingCartData, setGoodsShoppingCartData] = useState<any>({});
  const [shopData, setShopData] = useState<any>({});
  const [hasMore, setHasMore] = useState(true);

  const [search] = useSearchParams();
  const shopId = search.get('shopId');
  useEffect(() => {
    // todo: aHooks -> useEv.....
    // addE removeE 第二个参数必须是同一个函数

    request('curShop', 'GET', { shopId: shopId }).then((data) => setShopData(data.data));
    console.log('拉取了');
    request('shopShoppingCar', 'GET', { shopId: shopId }).then((data) => {
      console.log('拉取购物车信息 ');
      setGoodsShoppingCartData(data.data);
    });
  }, [shopId]);

  async function loadMore() {
    await sleep(1000);
    const append = await request('shopEvaluation', 'GET', { shopId }).then((data) => data.data.rows);
    setShopEvaluationList([...shopEvaluationList, ...append]);
    setHasMore(append.length > 0 && shopEvaluationList.length < 25);
  }

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
  const onSetShopShoppingCartData = async (del?: Boolean) => {
    let len = 0;
    await request('shopShoppingCar', 'GET', { id: shopId }).then((data) => {
      if (del) {
        setGoodsShoppingCartData({ rows: [], delivery: data.data.delivery, minPrice: data.data.minPrice });
        console.log('清空购物车');
      } else {
        console.log('拉取购物车信息<<<服务器');
        setGoodsShoppingCartData(data.data);
        len = data.data.rows.length;
      }
    });
    return len;
  };
  return (
    <div style={{ position: 'relative' }}>
      <div
        className="shop-nav"
        style={{
          backgroundColor: `rgba(255,255,255,${shopScroll / 200})`,
          color: `rgb(${255 - shopScroll},${255 - shopScroll},${255 - shopScroll})`,
        }}
      >
        <LeftOutline onClick={() => history.back()} />
        <div className="shop-focus">
          {isFocus && (
            <>
              <HeartFill color="red" onClick={onFocus} />
              <span>已关注</span>
            </>
          )}
          {!isFocus && (
            <>
              <HeartOutline onClick={onFocus} />
              <span>关注</span>
            </>
          )}
        </div>
      </div>
      <div className="shop-bgi" style={{ backgroundImage: `url(${shopData.image})` }} />
      <div className="shop-main">
        <div className="shop-main-nav">
          <Tabs
            activeKey={tabItems[activeIndex].key}
            onChange={(key) => {
              const index = tabItems.findIndex((item) => item.key === key);
              setActiveIndex(index);
              swiperRef.current?.swipeTo(index);
              index === 1 &&
                request('shopEvaluation', 'GET', { shopId: shopId }).then((data) => {
                  setShopEvaluationList(data.data.rows);
                  setShopScore(data.data);
                });
              index === 2 && request('shopIntro', 'GET', { shopId: shopId }).then((data) => setShopIntro(data.data));
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
              <div className="shop-goods-content">
                <GoodsContent
                  id={shopId || ''}
                  goodsShoppingCartData={goodsShoppingCartData}
                  onSetShopShoppingCartData={onSetShopShoppingCartData}
                />
              </div>
            </Swiper.Item>
            <Swiper.Item className="shop-main-evaluation">
              <div className="evaluation-summary">
                <div className="evaluation-score">
                  <div>
                    <h1>{shopScore?.score.toFixed(1)}</h1>
                    <span>
                      高于附近{shopScore?.morethan.toFixed(2)}%的商家
                      <Rate readOnly value={shopScore?.score} />
                    </span>
                  </div>
                  <div>
                    <span>
                      味道 <strong>{shopScore?.taste.toFixed(1)}</strong>
                    </span>
                    <span>
                      包装<strong>{shopScore?.packing.toFixed(1)}</strong>
                    </span>
                    <span>
                      配送满意度<strong>{shopScore?.deliver.toFixed(1)}%</strong>
                    </span>
                  </div>
                </div>
                <Selector
                  className="evaluation-tags"
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
                  value={[evaluationCurTag]}
                  onChange={(v) => {
                    if (v.length) {
                      setEvaluationCurTag(v[0]);
                      request('shopEvaluation', 'GET', { shopId: shopId }).then((data) => {
                        setShopEvaluationList(data.data.rows);
                      });
                    }
                  }}
                />
              </div>
              <div className="evaluation-content">
                {shopEvaluationList.map((item) => (
                  <ShopEvaluationCard key={item.id} {...item} />
                ))}
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
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
            <h2>{shopData.title}</h2>
            <div>
              <span>{shopData.score?.toFixed(2)}分</span>
              <span>蓝骑士专送</span>
              <span>约{shopData.time < 60 ? shopData.time + '分钟' : Math.floor(shopData.time / 60) + '小时'}</span>
              <span>·</span>
              <span>月售{shopData.monthSale}</span>
            </div>
          </div>
          <Image src={shopData.image} width="100%" fit="cover" style={{ borderRadius: 4 }} />
        </div>
        <div className="shop-board-discount">
          <div>
            <div className="shop-board-hongbao-vip">
              <span>￥{shopData?.hongbao?.find((item: any) => item.name === 'vip')?.tag}无门槛</span>
              <span>兑</span>
            </div>
            <div className="shop-board-hongbao-shop">
              <span>￥{shopData?.hongbao?.find((item: any) => item.name === 'shop')?.tag}</span>
              <span>兑</span>
            </div>
          </div>
          <div className="shop-board-discount-shop">
            <div>
              {shopData.discount?.map((item: any, idx: number) => (
                <div key={item}>
                  {idx > 0 && <Divider direction="vertical" />}
                  <span>{item}</span>
                </div>
              ))}
            </div>
            {shopData.first > 0 && <div>首次光临减{shopData.first}</div>}
          </div>
          <div></div>
        </div>
      </div>

      <ShopShoppingCar
        goodsShoppingCartData={goodsShoppingCartData}
        onSetShopShoppingCartData={onSetShopShoppingCartData}
      />
    </div>
  );
};
export default Shop;
