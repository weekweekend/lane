import React, { useEffect, useRef, useState } from 'react';
import { SideBar } from 'antd-mobile';
import './index.less';
import { useThrottleFn } from 'ahooks';
import ShopGoodsCard from 'components/ShopGoodsCard';

const params = {
  id: Math.random(),
  image: 'https://cube.elemecdn.com/2/5b/ba2f7d05eb4e84d1e0bc929f66c24jpg.jpg',
  title: '砂锅砂锅沙索',
  tag: '销量第一',
  rowMaterial: ['鸡肉', '猪肉'],
  mSales: 1233,
  price: 17,
  praised: 0.98,
};
const items = [
  {
    key: '1',
    title: '第一项第一项第一项第一项第一项第一项第一项',
    description: '大家喜欢吃，才是真的好吃大家喜欢吃，才是真的好吃',
    content: [<ShopGoodsCard {...params} />, <ShopGoodsCard {...params} />, <ShopGoodsCard {...params} />],
  },
  {
    key: '2',
    title: '第二项',
    description: '大家喜欢,大家喜欢吃，才是真的好吃大家喜欢吃，',
    content: [
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
    ],
  },
  {
    key: '3',
    title: '第三项',
    description: '大家喜欢',
    content: [<ShopGoodsCard {...params} />, <ShopGoodsCard {...params} />],
  },
  {
    key: '4',
    title: '第四项',
    description: '大家喜欢',
    content: [
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
      <ShopGoodsCard {...params} />,
    ],
  },
];

export default () => {
  const [activeKey, setActiveKey] = useState('1');
  const [titlePositionType, setTitlePositionType] = useState('');

  const { run: handleScroll } = useThrottleFn(
    () => {
      let currentKey = items[0].key;
      for (const item of items) {
        const element = document.getElementById(`anchor-${item.key}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 0) {
          currentKey = item.key;
        } else {
          break;
        }
      }
      setActiveKey(currentKey);
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    },
  );

  const mainElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainElement = mainElementRef.current;
    if (!mainElement) return;
    mainElement.addEventListener('scroll', handleScroll);
    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <div className="side">
        <SideBar
          activeKey={activeKey}
          onChange={(key) => {
            document.getElementById(`anchor-${key}`)?.scrollIntoView();
          }}
        >
          {items.map((item) => (
            <SideBar.Item key={item.key} title={item.title} />
          ))}
        </SideBar>
      </div>
      <div className="main" ref={mainElementRef}>
        {items.map((item) => (
          <div key={'main' && item.key}>
            <div className="main-title">
              <div>
                <h2 id={`anchor-${item.key}`}>{item.title}</h2>
                <span> {item.description}</span>
              </div>
            </div>
            <div className="main-content">
              {item.content.map((ele, idx) => (
                <div key={idx}>{ele}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
