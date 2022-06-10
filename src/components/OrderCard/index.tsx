import { FC } from 'react';
import { Tag, Image } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import './index.less';
import { Button } from 'antd-mobile';

const OrderCard: FC<{
  orderId: number;
  shopId: number;
  image: string;
  shopName: string;
  state: string;
  tag?: Array<string>;
  goods: Array<{
    image: string;
    name: string;
  }>;
  totalPrice: number;
  evaluation?: string;
  isEvaluated: boolean;
  orderPage: 'all' | 'evaluated' | 'notEvaluate';
}> = ({ orderId, shopId, image, shopName, state, tag, goods, totalPrice, evaluation, isEvaluated, orderPage }) => {
  return (
    <div
      className="order-card"
      onClick={(e) => {
        e.stopPropagation();
        window.location.href = `#/order/orderDetails?orderId=${encodeURIComponent(orderId)}`;
      }}
    >
      <a
        href={`#/shop?shopId=${encodeURIComponent(shopId)}`}
        className="order-card-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <Image src={image} />
          <h3>{shopName}</h3>
          <RightOutline color="#999" />
        </div>
        <div className="order-state">{state}</div>
      </a>
      <div className="order-card-tag">
        {tag &&
          tag.map((item, idx) => (
            <Tag key={idx} color="orangered">
              {item}
            </Tag>
          ))}
      </div>

      <div className="order-card-goods">
        <div className="goods-left">
          {goods.length > 1 && goods.map((item, idx) => <Image key={idx} src={item.image} />)}
          {goods.length === 1 && (
            <>
              <Image src={goods[0].image} /> <span>{goods[0].name}</span>
            </>
          )}
        </div>
        <div className="goods-right">
          <div>
            <i>￥</i>
            <span>{totalPrice.toFixed(2)}</span>
          </div>
          <div>共{goods.length}件</div>
        </div>
      </div>
      <div className="order-card-operation">
        {orderPage === 'all' && !isEvaluated && (
          <>
            <a href={`#/order/addEvaluation?orderId=${encodeURIComponent(orderId)}`}>
              <Button shape="rounded">去评价</Button>
            </a>
            <Button color="primary" fill="outline" shape="rounded">
              再来一单
            </Button>
          </>
        )}
        {orderPage === 'all' && isEvaluated && (
          <div>
            <p>{evaluation}</p>
            <Button color="primary" fill="outline" shape="rounded">
              再来一单
            </Button>
          </div>
        )}

        {orderPage === 'evaluated' && (
          <div>
            <p>{evaluation}</p>
            <Button color="primary" fill="outline" shape="rounded">
              再来一单
            </Button>
          </div>
        )}
        {orderPage === 'notEvaluate' && (
          <>
            <a href={`#/order/addEvaluation?orderId=${encodeURIComponent(orderId)}`}>
              <Button shape="rounded">去评价</Button>
            </a>
            <Button color="primary" fill="outline" shape="rounded">
              再来一单
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default OrderCard;
