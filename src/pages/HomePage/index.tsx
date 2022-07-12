import ShopCard from 'components/ShopCard';
import { FC, useState, useEffect } from 'react';

import { Swiper, Grid, InfiniteScroll } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';
import { RiArrowDownSFill } from 'react-icons/ri';
import request from 'utils/request';
import sleep from 'utils/sleep';
import {
  FcLinux,
  FcPaid,
  FcShop,
  FcEmptyTrash,
  FcCloseUpMode,
  FcSportsMode,
  FcPrivacy,
  FcLightAtTheEndOfTunnel,
  FcLandscape,
  FcFilmReel,
  FcInTransit,
  FcDribbble,
  FcHighBattery,
  FcBusinessContact,
  FcHome,
  FcCalendar,
} from 'react-icons/fc';
const tmp = [
  [
    {
      name: '美食外卖',
      url: '/',
      icon: <FcLinux />,
    },
    {
      name: '超市便利',
      url: '/',
      icon: <FcShop />,
    },
    {
      name: '美食团购',
      url: '/',
      icon: <FcPaid />,
    },
    {
      name: '甜品饮品',
      url: '/',
      icon: <FcEmptyTrash />,
    },
    {
      name: '跑腿',
      url: '/',
      icon: <FcSportsMode />,
    },
    {
      name: '买药',
      url: '/',
      icon: <FcPrivacy />,
    },
    {
      name: '鲜花',
      url: '/',
      icon: <FcCloseUpMode />,
    },
    {
      name: '水果',
      url: '/',
      icon: <FcLightAtTheEndOfTunnel />,
    },
  ],
  [
    {
      name: '景点门票',
      url: '/',
      icon: <FcLandscape />,
    },
    {
      name: '电影票',
      url: '/',
      icon: <FcFilmReel />,
    },
    {
      name: '货运搬家',
      url: '/',
      icon: <FcInTransit />,
    },
    {
      name: '丽人美发',
      url: '/',
      icon: <FcDribbble />,
    },
    {
      name: '充电宝',
      url: '/',
      icon: <FcHighBattery />,
    },
    {
      name: '信用卡',
      url: '/',
      icon: <FcBusinessContact />,
    },
    {
      name: '洗衣家政',
      url: '/',
      icon: <FcHome />,
    },
    {
      name: '全部',
      url: '/',
      icon: <FcCalendar />,
    },
  ],
];
let obj = {
  location: '116.481488,39.990464',
  keywords: '',
  types: '050301',
  offset: 20,
  page: 1,
  extensions: 'all',
};
const HomePage: FC<{}> = () => {
  const [homeHotSearch, setHomeHotSearch] = useState([]);
  const [homeShopList, setHomeShopList] = useState<Array<any>>([]);
  const [homeCurAddress, setHomeCurAddress] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    request('hotSearch', 'GET').then((data) => setHomeHotSearch(data.data.rows));
    request('address', 'GET').then((data) => {
      const idx = data.data.rows.findIndex((item: { cur: boolean }) => item.cur);
      setHomeCurAddress(data.data.rows[idx].address + data.data.rows[idx].addrDetail);
    });
  }, []);

  async function loadMore() {
    await sleep(300);
    const append = await request('shop', 'GET').then((data) => data.data.rows);
    setHomeShopList([...homeShopList, ...append]);
    setHasMore(append.length > 0 && homeShopList.length < 25);
  }

  return (
    <div>
      <div className="home-nav">
        <Link to="address">{homeCurAddress} &nbsp;</Link>
        <RiArrowDownSFill />
      </div>

      <Link to="search" className="home-search">
        <span>
          <div>
            <SearchOutline />
            <i>{homeHotSearch?.[0]}</i>
          </div>
          <span>搜 索</span>
        </span>
      </Link>
      <div className="home-content">
        <Swiper className="home-service">
          {tmp.map((item, index) => (
            <Swiper.Item key={index}>
              <div>
                <Grid columns={4}>
                  {item.map((ele) => (
                    <Link to={ele.url} key={ele.name}>
                      <Grid.Item>{ele.icon}</Grid.Item>
                      <span>{ele.name}</span>
                    </Link>
                  ))}
                </Grid>
              </div>
            </Swiper.Item>
          ))}
        </Swiper>

        {homeShopList.map((item) => (
          <ShopCard key={item.id} {...item} />
        ))}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
};

export default HomePage;
