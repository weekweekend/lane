import ShopCard from 'components/ShopCard';
import React, { memo, FC, useState } from 'react';
import './index.less';
import { SearchBar } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import { Link } from 'react-router-dom';
import { useSetState } from 'ahooks';

const HomePage: FC<{}> = () => {
  const [homeScroll, setHomeScroll] = useState(0);
  // const [offsetTop, setOffsetTop] = useState(0);

  window.addEventListener('scroll', (e) => {
    setHomeScroll(window.scrollY);
    // console.log(window.scrollY);
  });
  return (
    <div>
      <Link to="search" className="home-search">
        <span>
          <div>
            <SearchOutline />
            <i>火锅火锅火锅</i>
          </div>
          <span>搜索</span>
        </span>
      </Link>
      <div>
        <ShopCard
          image="https://cube.elemecdn.com/e/c8/7b12c0221cfb67a51af064bdbd2d8jpg.jpg"
          title="麦当劳mdl麦当劳mdl和卡拉货到付款安科技孵化三极端"
          score={4.9}
          monthSale={123}
          distance={1023}
          time={63}
          flagFall={20}
          deliveryCost={4}
          tags={['近7日324人下单', '掌柜热情', '网红店', '新鲜']}
          discount={[
            { name: '活动', tag: ['28减8', '38减15'] },
            { name: '红包', tag: ['6元无门槛', '4元店铺红包'] },
          ]}
        />
        <ShopCard
          image="https://cube.elemecdn.com/e/c8/7b12c0221cfb67a51af064bdbd2d8jpg.jpg"
          title="喀什酱豆腐卡号发空"
          score={5}
          monthSale={1263}
          distance={623}
          time={45}
          flagFall={20}
          deliveryCost={4}
          tags={['掌柜热情', '网红店', '新鲜']}
          discount={[
            { name: '活动', tag: ['28减8', '38减15'] },
            { name: '红包', tag: ['8元无门槛', '4元店铺红包'] },
          ]}
        />
        <ShopCard
          image="https://cube.elemecdn.com/e/c8/7b12c0221cfb67a51af064bdbd2d8jpg.jpg"
          title="喀什酱豆腐卡号发空"
          score={5}
          monthSale={1263}
          distance={623}
          time={45}
          flagFall={20}
          deliveryCost={4}
          tags={['掌柜热情', '网红店', '新鲜']}
          discount={[
            { name: '活动', tag: ['28减8', '38减15'] },
            { name: '红包', tag: ['8元无门槛', '4元店铺红包'] },
          ]}
        />
        <ShopCard
          image="https://cube.elemecdn.com/e/c8/7b12c0221cfb67a51af064bdbd2d8jpg.jpg"
          title="喀什酱豆腐卡号发空"
          score={5}
          monthSale={1263}
          distance={623}
          time={45}
          flagFall={20}
          deliveryCost={4}
          tags={['掌柜热情', '网红店', '新鲜']}
          discount={[
            { name: '活动', tag: ['28减8', '38减15'] },
            { name: '红包', tag: ['8元无门槛', '4元店铺红包'] },
          ]}
        />
        <ShopCard
          image="https://cube.elemecdn.com/e/c8/7b12c0221cfb67a51af064bdbd2d8jpg.jpg"
          title="喀什酱豆腐卡号发空"
          score={5}
          monthSale={1263}
          distance={623}
          time={45}
          flagFall={20}
          deliveryCost={4}
          tags={['掌柜热情', '网红店', '新鲜']}
          discount={[
            { name: '活动', tag: ['28减8', '38减15'] },
            { name: '红包', tag: ['8元无门槛', '4元店铺红包'] },
          ]}
        />
        <ShopCard
          image="https://cube.elemecdn.com/e/c8/7b12c0221cfb67a51af064bdbd2d8jpg.jpg"
          title="喀什酱豆腐卡号发空"
          score={5}
          monthSale={1263}
          distance={623}
          time={45}
          flagFall={20}
          deliveryCost={4}
          tags={['掌柜热情', '网红店', '新鲜']}
          discount={[
            { name: '活动', tag: ['28减8', '38减15'] },
            { name: '红包', tag: ['8元无门槛', '4元店铺红包'] },
          ]}
        />
        <ShopCard
          image="https://cube.elemecdn.com/e/c8/7b12c0221cfb67a51af064bdbd2d8jpg.jpg"
          title="喀什酱豆腐卡号发空"
          score={5}
          monthSale={1263}
          distance={623}
          time={45}
          flagFall={20}
          deliveryCost={4}
          tags={['掌柜热情', '网红店', '新鲜']}
          discount={[
            { name: '活动', tag: ['28减8', '38减15'] },
            { name: '红包', tag: ['8元无门槛', '4元店铺红包'] },
          ]}
        />
      </div>
    </div>
  );
};

export default HomePage;
