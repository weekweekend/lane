import { useState } from 'react';
import { Tabs, Skeleton, InfiniteScroll } from 'antd-mobile';
import './index.less';
import OrderCard from 'components/OrderCard';
import request from 'utils/request';
import sleep from 'utils/sleep';

const Order = () => {
  const [orderList, setOrderList] = useState<Array<any>>([]);
  const [curOrderPage, setCurOrderPage] = useState('all');
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    await sleep(500);
    const append = await request('orders', 'GET', { type: curOrderPage }).then((data) => data.data.rows);
    setOrderList([...orderList, ...append]);
    setHasMore(append.length > 0 && orderList.length < 25);
  }

  return (
    // todo：无限滚动
    <div className="order">
      <Tabs
        className="order-nav"
        activeLineMode="fixed"
        onChange={(val) => {
          setCurOrderPage(val);
          setOrderList([]);
          setHasMore(true);
        }}
      >
        <Tabs.Tab title="全部" key="all" />
        <Tabs.Tab title="待评价" key="notEvaluate" />
        <Tabs.Tab title="已评价" key="evaluated" />
      </Tabs>

      <div className="order-content">
        {orderList.length <= 0 && (
          <>
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
          </>
        )}
        {orderList.map((item: any) => (
          <OrderCard {...item} key={item.orderId} orderPage={curOrderPage} />
        ))}

        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
};
export default Order;
