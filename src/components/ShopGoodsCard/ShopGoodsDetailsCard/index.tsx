import { FC, useState } from 'react';
import { Image, Button, Popup, Stepper, Selector } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';

const ShopGoodsDetailsCard: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [goodsNum, setGoodsNum] = useState(1);
  const [tasteVal, setTasteVal] = useState('1');
  return (
    <>
      <div className="goods-des">
        <Image
          src={'https://cube.elemecdn.com/2/5b/ba2f7d05eb4e84d1e0bc929f66c24jpg.jpg'}
          width="100%"
          fit="cover"
          style={{ borderRadius: 4 }}
        />
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
          min={0}
          value={goodsNum}
          onChange={(value) => {
            setGoodsNum(value);
          }}
        />
      </div>
      <div>
        <h3>口味</h3>
        <Selector
          className="goods-taste"
          options={[
            {
              label: '香辣',
              value: '1',
            },
            {
              label: '麻辣',
              value: '2',
            },
            {
              label: '不辣',
              value: '3',
            },
          ]}
          value={[tasteVal]}
          onChange={(v) => {
            if (v.length) {
              setTasteVal(v[0]);
            }
          }}
        />
      </div>
      <Button
        type="submit"
        block
        color="primary"
        shape="rounded"
        style={{ position: 'fixed', bottom: '1rem', width: '94%' }}
      >
        选好了
      </Button>
    </>
  );
};
export default ShopGoodsDetailsCard;
