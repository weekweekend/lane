import TuWei from 'components/TuWei';
import { memo, FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './index.less';

const Layout: FC<{}> = () => {
  return (
    <div className="layout">
      <header>
        <Link to="/" className="logo">
          桃子404
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
        <TuWei />
      </footer>
    </div>
  );
};

export default memo(Layout);
