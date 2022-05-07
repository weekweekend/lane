import TuWei from 'components/TuWei';
import { memo, FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { RiHome5Line, RiCake3Fill, RiEmotion2Line, RiFileList2Line } from 'react-icons/ri';
import './index.less';

const Layout: FC<{}> = () => {
  return (
    <div className="layout">
      <header>
        <Link to="/" className="logo">
          用户
        </Link>

        <nav>
          <Link to="/list">List</Link>
          <Link to="/404">404</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <div>
          <RiHome5Line size={'1.15rem'} /> <span>首页</span>
        </div>
        <div>
          <RiCake3Fill size={'1.15rem'} /> <span>真香</span>
        </div>
        <div>
          <RiFileList2Line size={'1.15rem'} /> <span>订单</span>
        </div>
        <div>
          <RiEmotion2Line size={'1.15rem'} /> <span>我的</span>
        </div>
      </footer>
    </div>
  );
};

export default memo(Layout);
