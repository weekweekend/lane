import { memo, FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { RiHome5Line, RiEmotion2Line, RiFileList2Line } from 'react-icons/ri';
import './index.less';

const Layout: FC<{}> = () => {
  const homeCurPage = useLocation().pathname;
  return (
    <div className="layout">
      <main style={{ position: 'relative' }}>
        <Outlet />
      </main>
      <footer>
        <a href="#/" className={homeCurPage === '/' ? 'home-cur-active' : ''}>
          <RiHome5Line /> <span>首页</span>
        </a>
        <a href="#/order" className={homeCurPage === '/order' ? 'home-cur-active' : ''}>
          <RiFileList2Line /> <span>订单</span>
        </a>
        <a href="#/mine" className={homeCurPage === '/mine' ? 'home-cur-active' : ''}>
          <RiEmotion2Line /> <span>我的</span>
        </a>
      </footer>
    </div>
  );
};

export default memo(Layout);
