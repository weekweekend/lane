import { FC } from 'react';
import { Tag } from 'antd-mobile';
import { EditSOutline } from 'antd-mobile-icons';
import './index.less';

const AddressCard: FC<{
  id: number;
  address: string;
  addrDetail: string;
  name: string;
  sex: string;
  phone: string;
  tag?: string;
  cur: boolean;
}> = ({ id, address, addrDetail, name, sex, phone, tag, cur }) => {
  return (
    <div className="address-card">
      <div className="address-card-content">
        <div>
          {tag && <Tag>{tag}</Tag>}
          <h2>
            {address}
            {addrDetail}
          </h2>
        </div>
        <div className="address-card-content-msg">
          <span>
            {name}
            {sex == '女' ? '(女士)' : '(先生)'}
          </span>
          <span>{phone}</span>
        </div>
      </div>
      <a href={`#/address/edit?id=${encodeURIComponent(id)}`} onClick={(e) => e.stopPropagation()}>
        <EditSOutline color="#ccc" />
      </a>
    </div>
  );
};
export default AddressCard;
