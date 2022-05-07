import ShopCard from 'components/ShopCard';
import React, { memo, FC } from 'react';

const Welcome: FC<{}> = () => (
  <div>
    <h1>Welcome</h1>
    <p>This is welcome page.</p>
  </div>
);

export default memo(Welcome);
