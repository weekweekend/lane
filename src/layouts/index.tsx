import { memo, FC, useState, useEffect } from 'react';
import { Tabs, Avatar } from 'antd-mobile';
import { Outlet, Link } from 'react-router-dom';
import { RiHome5Line, RiEmotion2Line, RiFileList2Line, RiArrowDownSFill } from 'react-icons/ri';
import './index.less';
import request from 'utils/request';

const Layout: FC<{}> = () => {
  // todo: 这个变量没有必要
  const [homeCurPage, setHomeCurPage] = useState('');
  const [homeCurAddress, setHomeCurAddress] = useState('');
  const [account, setAccount] = useState<any>({});
  const searchCurPage = window.location.hash.split('/')[1] || 'home';

  useEffect(() => {
    setHomeCurPage(searchCurPage);
    searchCurPage === 'home' &&
      request('address', 'GET').then((data) => {
        const idx = data.data.rows.findIndex((item: { cur: boolean }) => item.cur);
        setHomeCurAddress(data.data.rows[idx].address + data.data.rows[idx].addrDetail);
      });
    request('account', 'GET').then((data) => setAccount(data.data));
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
          <div className="header-nav" style={{ width: '75%' }}>
            <div>
              <Link to="address">{homeCurAddress} &nbsp;</Link>
              <RiArrowDownSFill />
            </div>
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
          <div className="header-nav" style={{ height: '4rem' }}>
            <Link to="profile">
              <Avatar src={account.avatar} />
              <h2>
                {/^\d{3}/.exec(account.account)}****{/\d{4}$/.exec(account.account)}
              </h2>
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
