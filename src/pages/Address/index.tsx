import { FC, useEffect, useState } from 'react';
import { Tag, Image, Divider, NavBar, List } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';
import AddressCard from 'components/AddressCard';
import request from 'utils/request';
const Address = () => {
  const [addressList, setAddressList] = useState<Array<any>>([]);
  const [curAddress, setCurAddress] = useState<any>({});
  useEffect(() => {
    request('mock/getAddress.json', 'GET').then((data) => {
      setAddressList(data.data);
      const curIdx = data.data.findIndex((item: { cur: boolean }) => item.cur);
      if (curIdx) setCurAddress(data.data[curIdx]);
      console.log(curIdx);
    });
  }, []);
  return (
    <div className="address-edit">
      <NavBar className="address-nav" right={<Link to="edit">新增地址</Link>} onBack={() => window.history.go(-1)}>
        收货地址
      </NavBar>
      <List className="address-list address-cur" header="当前地址">
        <List.Item>
          <AddressCard {...curAddress} />
        </List.Item>
      </List>
      <List className="address-list" header="收货地址">
        {addressList.map((item, idx) => (
          <List.Item
            key={item.address}
            onClick={(e) => {
              console.log(e.target);
              setCurAddress(addressList[idx]);
              request('mock/test.json', 'PUT').then((data) => console.log('换地址>>>', data.data.msg, item));
            }}
          >
            <AddressCard {...item} />
          </List.Item>
        ))}
      </List>
    </div>
  );
};
export default Address;
