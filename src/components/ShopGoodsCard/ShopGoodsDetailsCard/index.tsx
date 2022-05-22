import { FC, useState } from 'react';
import { Image, Button, Popup, Stepper, Selector } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';

const ShopGoodsDetailsCard: FC<{
  onClose: () => void;
  image: string;
  title: string;
  price: number;
  minNum?: number;
  maxNum?: number;
  details?: Array<{
    id: number;
    name: string;
    params: Array<string>;
  }>;
}> = ({ onClose, image, title, price, minNum, maxNum, details }) => {
  const [goodsNum, setGoodsNum] = useState(0);
  const [tasteVal, setTasteVal] = useState();
  return (
    <>
      <div className="goods-des">
        <Image src={image} width="100%" fit="cover" style={{ borderRadius: 4 }} />
        <div>
          <div className="goods-des-title">
            砂锅砂锅砂锅
            <CloseOutline onClick={onClose} />
          </div>
          <div className="goods-des-chosen">已选：麻辣</div>
          <div className="goods-des-price">￥18</div>
        </div>
      </div>
      <div className="goods-num">
        <h3>数量</h3>
        <Stepper
          min={minNum}
          max={maxNum}
          value={goodsNum}
          onChange={(value) => {
            setGoodsNum(value);
          }}
        />
      </div>
      <div>
        {details?.map((item) => (
          <>
            <h3>{item.name}</h3>
            <Selector
              className="goods-select"
              options={item.params.map((ele) => ({ label: ele, value: ele }))}
              onChange={(v) => {
                console.log(v);
              }}
            />
          </>
        ))}
      </div>
      <Button
        type="submit"
        block
        color="primary"
        shape="rounded"
        style={{ position: 'fixed', bottom: '1rem', width: '94%' }}
        onClick={onClose}
      >
        选好了
      </Button>
    </>
  );
};
export default ShopGoodsDetailsCard;
