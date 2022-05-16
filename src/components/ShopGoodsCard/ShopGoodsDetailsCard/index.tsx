import { FC, useState } from 'react';
import { Image, Button, Popup, Stepper } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';

const ShopGoodsDetailsCard: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const [num, setNum] = useState(1);
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
          value={num}
          onChange={(value) => {
            setNum(value);
          }}
        />
      </div>
      <div>
        <h3>口味</h3>
        <div className="goods-taste">
          <Button>香辣</Button>
          <Button>香辣</Button>
          <Button>香辣</Button>
          <Button>香辣</Button>
        </div>
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
