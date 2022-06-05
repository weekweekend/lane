import { useState, useEffect } from 'react';
import './index.less';
import OrderCard from 'components/OrderCard';
import request from 'utils/request';

const Order = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    request('orders', 'GET').then((data) => setOrderList(data.data.rows));
  }, []);

  return (
    // todo：无限滚动
    <div className="order">
      {orderList.map((item: any) => (
        <OrderCard {...item} key={item.orderId} />
      ))}
    </div>
  );
};
export default Order;
