import { useEffect, useRef, useState, FC } from 'react';
import { SideBar } from 'antd-mobile';
import './index.less';
import { useThrottleFn } from 'ahooks';
import ShopGoodsCard from 'components/ShopGoodsCard';
import request from 'utils/request';

const GoodsContent: FC<{
  id: string;
  goodsShoppingCartData: any;
  onSetShopShoppingCartData: () => void;
}> = ({ id, goodsShoppingCartData, onSetShopShoppingCartData }) => {
  const [activeKey, setActiveKey] = useState('1');
  const [shopGoods, setShopGoods] = useState<any>([]);

  const { run: handleScroll } = useThrottleFn(
    () => {
      let currentKey = shopGoods[0].key;
      for (const item of shopGoods) {
        const element = document.getElementById(`anchor-${item.key}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        // console.log(rect.top, item.key);
        if (rect.top <= 105) {
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
    request('shopGoods', 'GET', { shopId: id }).then((data) => {
      setShopGoods(data.data.rows);
    });
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
          {shopGoods.map((item: any) => (
            <SideBar.Item key={item.key} title={item.type} />
          ))}
        </SideBar>
      </div>
      <div className="main" ref={mainElementRef}>
        {shopGoods.map((item: any) => (
          <div key={item.key}>
            <div className="main-title">
              <div>
                <h2 id={`anchor-${item.key}`}>{item.type}</h2>
                <span> {item.description}</span>
              </div>
            </div>
            <div className="main-content">
              {item.goods.map((ele: any) => (
                <div key={ele.id}>
                  <ShopGoodsCard
                    {...ele}
                    goodsShoppingCartData={goodsShoppingCartData}
                    onSetShopShoppingCartData={onSetShopShoppingCartData}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GoodsContent;
