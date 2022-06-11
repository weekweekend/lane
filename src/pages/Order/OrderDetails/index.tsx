import { Divider, NavBar } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import { useState, useEffect } from 'react';
import './index.less';
import { useSearchParams } from 'react-router-dom';
import request from 'utils/request';
import SettlementGoodsCard from 'components/SettlementGoodsCard';

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  const state = params.get('state');

  useEffect(() => {
    request('orderDetails', 'GET', { orderId }).then((data) => {
      setOrderDetails(data.data);
      console.log(data.data);
    });
  }, [orderId]);

  return (
    <div className="order-details">
      <NavBar
        onBack={() => {
          if (state) history.go(-2);
          else history.back();
        }}
        className="order-details-nav"
      >
        {state ? '订单正在配送' : '订单已送达'}
      </NavBar>
      <div className="order-details-content">
        <a href={`#/shop?shopId=${encodeURIComponent(orderDetails.shopId)}`}>
          <h3 className="shop-name">
            {orderDetails.shopName}
            <RightOutline fontSize={'.8rem'} />
          </h3>
        </a>
        <div className="shop-goods">
          {orderDetails.rows?.map((item: any) => (
            <SettlementGoodsCard
              key={item.id}
              isOrder={true}
              image={item.image}
              name={item.name}
              price={item.price}
              number={item.number}
            />
          ))}
        </div>
        <div className="others-price">
          <div>包装费</div>
          <div>
            实付 <i>￥</i>
            <h3>{orderDetails.packing?.toFixed(2)}</h3>
          </div>
        </div>
        <div className="others-price">
          <div>配送费</div>
          <div>
            实付 <i>￥</i>
            <h3>{orderDetails.delivery?.toFixed(2)}</h3>
          </div>
        </div>
        <div className="total">
          <div className="total-discount">
            总优惠
            <span>
              <i>￥</i>
              <h3>{orderDetails.totalDiscount?.toFixed(2)}</h3>
            </span>
          </div>
          <div className="total-price">
            实付款
            <span>
              <i>￥</i>
              <h3>{orderDetails.totalPrice?.toFixed(2)}</h3>
            </span>
          </div>
        </div>
        <Divider />
        <div className="order-msg">
          <div>收货信息</div>
          <div className="address">
            <span>{orderDetails?.address?.address}</span>
            <span>
              {orderDetails?.address?.name}
              {orderDetails?.address?.sex === '女' ? '(女士) ' : '(男士) '}
              {orderDetails?.address?.phone}
            </span>
          </div>
        </div>
        <div className="order-msg">
          <span>订单编号</span>
          <span>{orderDetails.orderNumber}</span>
        </div>
        <div className="order-msg">
          <span>送达时间</span>
          <span>{orderDetails.deliveryTime}</span>
        </div>
        <div className="order-msg">
          <span>支付方式</span>
          <span>在线支付</span>
        </div>
        <div className="order-msg">
          <span>配送骑手</span>
          <span>{orderDetails.deliveryPerson}</span>
        </div>
        <div className="order-msg">
          <span>下单时间</span>
          <span>{orderDetails.orderTime}</span>
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
