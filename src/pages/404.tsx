import ShopCard from 'components/ShopCard';
import { memo, FC } from 'react';

const Page404: FC<{}> = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Ooops, page not found.</p>
      <ShopCard />
    </div>
  );
};

export default memo(Page404);
