import TuWei from 'components/TuWei';
import { memo, FC, useState } from 'react';
import { Button, ActionSheet, Popup, Tabs, Avatar } from 'antd-mobile';
import { Outlet, Link } from 'react-router-dom';
import { RiHome5Line, RiEmotion2Line, RiFileList2Line, RiShoppingCartLine, RiArrowDownSFill } from 'react-icons/ri';
import './index.less';

const Layout: FC<{}> = () => {
  const [homeCurPage, setHomeCurPage] = useState('home');
  return (
    <div className="layout">
      <header>
        {homeCurPage === 'home' && (
          <div className="header-nav">
            <div>
              <Link to="address">地址地址地址地址地址地址地址地址地址地址</Link>
              <RiArrowDownSFill />
            </div>
            <Link to="shoppingCar">
              <RiShoppingCartLine size="1.3rem" />
            </Link>
          </div>
        )}
        {homeCurPage === 'order' && (
          <Tabs className="header-nav" activeLineMode="fixed">
            <Tabs.Tab title="水果" key="fruits" />
            <Tabs.Tab title="蔬菜" key="vegetables" />
            <Tabs.Tab title="动物" key="animals" />
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
