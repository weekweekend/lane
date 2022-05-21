import ShopCard from 'components/ShopCard';
import React, { memo, FC, useState, useEffect } from 'react';
import './index.less';
import { SearchBar, Swiper, Grid } from 'antd-mobile';
import { SearchOutline, SmileFill } from 'antd-mobile-icons';
import { Link } from 'react-router-dom';
import { useSetState } from 'ahooks';
import request from 'utils/request';
import {
  FcLinux,
  FcPaid,
  FcShop,
  FcEmptyTrash,
  FcCloseUpMode,
  FcSportsMode,
  FcPrivacy,
  FcLightAtTheEndOfTunnel,
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
      url: 'acc',
      icon: <FcShop />,
    },
    {
      name: '美食团购',
      url: 'acc',
      icon: <FcPaid />,
    },
    {
      name: '甜品饮品',
      url: 'acc',
      icon: <FcEmptyTrash />,
    },
    {
      name: '跑腿',
      url: 'acc',
      icon: <FcSportsMode />,
    },
    {
      name: '买药',
      url: 'acc',
      icon: <FcPrivacy />,
    },
    {
      name: '鲜花',
      url: 'acc',
      icon: <FcCloseUpMode />,
    },
    {
      name: '水果',
      url: 'acc',
      icon: <FcLightAtTheEndOfTunnel />,
    },
  ],
  [
    {
      name: '岁的法国',
      url: 'acc',
      icon: <FcLinux />,
    },
    {
      name: '士大夫',
      url: 'acc',
      icon: <SmileFill />,
    },
    {
      name: '的师父说过',
      url: 'acc',
      icon: <SmileFill />,
    },
    {
      name: '是法国',
      url: 'acc',
      icon: <SmileFill />,
    },
    {
      name: '优化',
      url: 'acc',
      icon: <SmileFill />,
    },
    {
      name: '微软',
      url: 'acc',
      icon: <SmileFill />,
    },
    {
      name: '你好过分',
      url: 'acc',
      icon: <SmileFill />,
    },
    {
      name: '全部',
      url: 'acc',
      icon: <SmileFill />,
    },
  ],
];

const HomePage: FC<{}> = () => {
  const [homeScroll, setHomeScroll] = useState(0);
  const [homeHotSearch, setHomeHotSearch] = useState([]);
  const [homeShopList, setHomeShopList] = useState<Array<any>>([]);

  useEffect(() => {
    request('mock/getHotSearch.json', 'GET').then((data) => setHomeHotSearch(data.data));
    request('mock/getShop.json', 'GET').then((data) => setHomeShopList(data.data));
  }, []);

  window.addEventListener('scroll', (e) => {
    setHomeScroll(window.scrollY);
  });

  return (
    <div>
      <Link to="search" className="home-search">
        <span>
          <div>
            <SearchOutline />
            <i>{homeHotSearch?.[0]}</i>
          </div>
          <span>搜索</span>
        </span>
      </Link>
      <div className="home-content">
        {/* <Swiper className="home-service">
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
        </Swiper> */}

        {homeShopList.map((item) => (
          <ShopCard key={item.id} {...item} />
        ))}
        <p>附近暂无更多店铺</p>
      </div>
    </div>
  );
};

export default HomePage;
