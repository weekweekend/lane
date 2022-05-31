import { Button, NavBar, Tag, Popup, Radio, Divider, Rate, Space, Toast, Selector, Image } from 'antd-mobile';
import {
  RightOutline,
  CloseOutline,
  MoreOutline,
  HeartOutline,
  HeartFill,
  LeftOutline,
  PhoneFill,
  EnvironmentOutline,
} from 'antd-mobile-icons';
import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { RiRedPacketFill } from 'react-icons/ri';
import ShopEvaluationCard from 'components/ShopEvaluationCard';
import SettlementGoodsCard from 'components/SettlementGoodsCard';
import request from 'utils/request';
import AddressCard from 'components/AddressCard';
const Settlement = () => {
  const shopId = new URLSearchParams(window.location.hash.split('?')[1]).get('shopId');
  const [addrList, setAddrList] = useState([]);
  const [curAddr, setCurAddr] = useState<any>({});
  const [shopPurchases, setShopPurchases] = useState<any>({});
  const [isShowAddrSelect, setIsShowAddrSelect] = useState(false);

  useEffect(() => {
    request('mock/getAddress.json', 'GET').then((data) => {
      setAddrList(data.data);
      const curIdx = data.data.findIndex((item: any) => item.cur);
      setCurAddr(data.data[curIdx]);
    });
    request('mock/getSettlement.json', 'GET', { shopId: shopId }).then((data) => setShopPurchases(data.data));
    // addrList[0].address;
  }, []);

  return (
    <div className="settlement">
      <NavBar onBack={() => window.history.go(-1)} className="settlement-nav">
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
                      request('mock/test.json', 'PUT', { id: item.id }).then((data) =>
                        console.log('设置当前地址 >>> 服务器'),
                      );
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
          {shopPurchases.list?.map((item: any) => (
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
              {shopPurchases.packing}
            </div>
          </div>
          <div>
            <span>配送费</span>
            <div>
              <i>￥</i>
              {shopPurchases.delivery}
            </div>
          </div>
          <div>
            <span>
              <RiRedPacketFill color="red" fontSize={'1rem'} />
              红包/抵用券
            </span>
            <div style={{ color: 'orangered' }}>
              <i>-￥</i>
              {shopPurchases.discount}
              <RightOutline fontSize={'.8rem'} color="#999" />
            </div>
          </div>
        </div>
        <div className="settlement-cal">
          <span>优惠说明</span>
          <div>
            <div>
              已优惠<i>￥{shopPurchases.totalDiscount}</i>
            </div>
            <span>
              小计￥<i>{shopPurchases.totalPrice}</i>
            </span>
          </div>
        </div>
      </div>

      <div className="settlement-footer">
        <div>
          <span>
            合计 <strong>￥</strong>
            <i>{shopPurchases.totalPrice}</i>
          </span>
          <div>已优惠￥{shopPurchases.totalDiscount}</div>
        </div>
        <Button color="primary" shape="rounded" onClick={() => console.log('提交订单')}>
          提交订单
        </Button>
      </div>
    </div>
  );
};
export default Settlement;
