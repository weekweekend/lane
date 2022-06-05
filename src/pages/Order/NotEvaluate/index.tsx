import { useState, useEffect } from 'react';
import './index.less';
import OrderCard from 'components/OrderCard';
import request from 'utils/request';

const NotEvaluate = () => {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    request('notEvaluated', 'GET').then((data) => setOrderList(data.data.rows));
  }, []);
  return (
    <div className="order">
      {orderList.map((item: any) => (
        <OrderCard {...item} key={item.orderId} />
      ))}
    </div>
  );
};
export default NotEvaluate;
