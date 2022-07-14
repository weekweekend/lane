import { Button, NavBar, Tag, Popup, Radio } from 'antd-mobile';
import { RightOutline, CloseOutline } from 'antd-mobile-icons';
import { useState, useEffect } from 'react';
import './index.less';
import { RiRedPacketFill } from 'react-icons/ri';
import SettlementGoodsCard from 'components/SettlementGoodsCard';
import request from 'utils/request';
import AddressCard from 'components/AddressCard';
import { useSearchParams } from 'react-router-dom';
import sleep from 'utils/sleep';

const Settlement = () => {
  const [addrList, setAddrList] = useState([]);
  const [curAddr, setCurAddr] = useState<any>({});
  const [shopPurchases, setShopPurchases] = useState<any>({});
  const [isShowAddrSelect, setIsShowAddrSelect] = useState(false);
  const [params] = useSearchParams();
  const shopId = params.get('shopId');

  useEffect(() => {
    request('address', 'GET').then((data) => {
      setAddrList(data.data.rows);
      const curIdx = data.data.rows.findIndex((item: any) => item.cur);
      setCurAddr(data.data.rows[curIdx]);
    });
    request('settlement', 'GET', { shopId: shopId }).then((data) => setShopPurchases(data.data));
    // addrList[0].address;
  }, []);

  return (
    <div className="settlement">
      <NavBar onBack={() => history.back()} className="settlement-nav">
        确认订单
      </NavBar>
      <div className="settlement-client">
        <div className="settlement-client-addr" onClick={() => setIsShowAddrSelect(true)}>
          {curAddr.tag && <Tag>{curAddr.tag}</Tag>}
          <h3>
            {curAddr.address}
            {curAddr.addrDetail}
          </h3>
          <RightOutline />
          <Popup
            className="settlement-addr-select"
            visible={isShowAddrSelect}
            onMaskClick={() => {
              setIsShowAddrSelect(false);
            }}
          >
            <div style={{ height: '70vh', overflowY: 'scroll' }}>
              <div>
                <h2>选择收货地址</h2>
                <CloseOutline onClick={() => setIsShowAddrSelect(false)} />
              </div>
              <Radio.Group>
                {addrList?.map((item: any) => (
                  <Radio
                    key={item.id}
                    value={item.id}
                    onChange={() => {
                      setCurAddr(item);
                      setIsShowAddrSelect(false);
                      request('put', 'PUT', { id: item.id }).then((data) => console.log('设置当前地址 >>> 服务器'));
                    }}
                  >
                    <AddressCard {...item} />
                  </Radio>
                ))}
              </Radio.Group>
              <Button
                color="primary"
                shape="rounded"
                onClick={() => {
                  window.location.href = '#/address/edit';
                }}
              >
                新增收货地址
              </Button>
            </div>
          </Popup>
        </div>
        <div style={{ color: '#999', fontWeight: 'normal', marginTop: '-.6rem' }}>
          {curAddr.name}
          {' ' + curAddr.phone}
        </div>
        <div>
          <span>立即送出</span>
          <span className="settlement-client-select">
            尽快送达
            <RightOutline />
          </span>
        </div>
        <div>
          <span>支付方式</span>
          <span className="settlement-client-select">
            支付宝
            <RightOutline />
          </span>
        </div>
      </div>
      <div className="settlement-goods">
        <div style={{ fontSize: '.8rem', color: '#999', padding: '.3rem 0' }}>{shopPurchases.shopName}</div>
        <div>
          {shopPurchases.rows?.map((item: any) => (
            <SettlementGoodsCard
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              number={item.number}
            />
          ))}
        </div>
        <div className="settlement-others">
          <div>
            <span>包装费</span>
            <div>
              <i>￥</i>
              {shopPurchases.packing?.toFixed(2)}
            </div>
          </div>
          <div>
            <span>配送费</span>
            <div>
              <i>￥</i>
              {shopPurchases.delivery?.toFixed(2)}
            </div>
          </div>
          <div>
            <span>
              <RiRedPacketFill color="red" fontSize={'1rem'} />
              红包/抵用券
            </span>
            <div style={{ color: 'orangered' }}>
              <i>-￥</i>
              {shopPurchases.discount?.toFixed(2)}
              <RightOutline fontSize={'.8rem'} color="#999" />
            </div>
          </div>
        </div>
        <div className="settlement-cal">
          <span>优惠说明</span>
          <div>
            <div>
              已优惠<i>￥{shopPurchases.totalDiscount?.toFixed(2)}</i>
            </div>
            <span>
              小计￥<i>{shopPurchases.totalPrice?.toFixed(2)}</i>
            </span>
          </div>
        </div>
      </div>

      <div className="settlement-footer">
        <div>
          <span>
            合计 <strong>￥</strong>
            <i>{shopPurchases.totalPrice?.toFixed(2)}</i>
          </span>
          <div>已优惠￥{shopPurchases.totalDiscount?.toFixed(2)}</div>
        </div>
        <Button
          color="primary"
          shape="rounded"
          onClick={() => {
            request('submitOrder', 'POST').then(async (data) => {
              if (data.success) {
                await sleep(1000);
                window.location.href = window.location.href = `#/order/orderDetails?orderId=${data.orderId}&&state=1`;
              }
            });
          }}
        >
          提交订单
        </Button>
      </div>
    </div>
  );
};
export default Settlement;
