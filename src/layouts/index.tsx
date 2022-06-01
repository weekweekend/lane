import TuWei from 'components/TuWei';
import { memo, FC, useState, useEffect } from 'react';
import { Button, ActionSheet, Popup, Tabs, Avatar } from 'antd-mobile';
import { Outlet, Link } from 'react-router-dom';
import { RiHome5Line, RiEmotion2Line, RiFileList2Line, RiShoppingCartLine, RiArrowDownSFill } from 'react-icons/ri';
import './index.less';
import request from 'utils/request';

const Layout: FC<{}> = () => {
  const [homeCurPage, setHomeCurPage] = useState('');
  const [homeCurAddress, setHomeCurAddress] = useState('');
  const searchCurPage = window.location.hash.split('/')[1] || 'home';
  useEffect(() => {
    setHomeCurPage(searchCurPage);
    request('address', 'GET').then((data) => {
      const idx = data.data.findIndex((item: { cur: boolean }) => item.cur);
      setHomeCurAddress(data.data[idx].address + data.data[idx].addrDetail);
    });
  }, [searchCurPage]);
  return (
    <div className="layout">
      <header
        style={
          homeCurPage === 'home'
            ? { backgroundColor: '#fff' }
            : { backgroundColor: '#fafafa', position: 'fixed', zIndex: '99' }
        }
      >
        {homeCurPage === 'home' && (
          <div className="header-nav">
            <div style={{ width: '55%' }}>
              <Link to="address">{homeCurAddress} &nbsp;</Link>
              <RiArrowDownSFill />
            </div>
            <Link to="shoppingCar">
              <RiShoppingCartLine size="1.3rem" />
            </Link>
          </div>
        )}
        {homeCurPage === 'order' && (
          <Tabs
            className="header-nav"
            activeLineMode="fixed"
            onChange={(val) => {
              window.location.href = `#/${val}`;
            }}
          >
            <Tabs.Tab title="全部" key="order" />
            <Tabs.Tab title="待评价" key="notEvaluate" />
            <Tabs.Tab title="已评价" key="evaluated" />
          </Tabs>
        )}
        {homeCurPage === 'mine' && (
          <div className="header-nav">
            <Link to="profile">
              <Avatar src="" />
              <h2>133****5555</h2>
            </Link>
          </div>
        )}
      </header>

      <main style={{ position: 'relative' }}>
        <Outlet />
      </main>

      <footer>
        <a href="#/" className={homeCurPage === 'home' ? 'home-cur-active' : ''} onClick={() => setHomeCurPage('home')}>
          <RiHome5Line /> <span>首页</span>
        </a>
        <a
          href="#/order"
          className={homeCurPage === 'order' ? 'home-cur-active' : ''}
          onClick={() => setHomeCurPage('order')}
        >
          <RiFileList2Line /> <span>订单</span>
        </a>
        <a
          href="#/mine"
          className={homeCurPage === 'mine' ? 'home-cur-active' : ''}
          onClick={() => setHomeCurPage('mine')}
        >
          <RiEmotion2Line /> <span>我的</span>
        </a>
      </footer>
    </div>
  );
};

export default memo(Layout);
