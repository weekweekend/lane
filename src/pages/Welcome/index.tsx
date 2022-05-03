import ShopCard from 'components/ShopCard';
import React, { memo, FC } from 'react';

const Welcome: FC<{}> = () => (
  <div>
    <h1>Welcome</h1>
    <p>This is welcome page.</p>
    <ShopCard
      image="https://cube.elemecdn.com/e/c8/7b12c0221cfb67a51af064bdbd2d8jpg.jpg"
      title="麦当劳mdl麦当劳mdl"
      score={4.9}
      monthSale={123}
      distance={1023}
      time={63}
      flagFall={20}
      deliveryCost={4}
      tags={['网红店', '新鲜']}
      discount={[
        { name: '活动', tag: ['28减8', '38减15'] },
        { name: '红包', tag: ['6元无门槛', '4元店铺红包'] },
      ]}
    />
  </div>
);

export default memo(Welcome);
