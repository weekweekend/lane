import { FC, useEffect, useState } from 'react';
import { Image, Button, Popup, Stepper, Selector, Form } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';
import request from 'utils/request';

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
  onSetShopShoppingCar: () => void;
}> = ({ onClose, image, title, price, minNum, maxNum, details, onSetShopShoppingCar }) => {
  const [goodsNum, setGoodsNum] = useState(0);
  const [tasteVal, setTasteVal] = useState();
  const onFinish = (values: any) => {
    request('mock/test.json', 'PUT').then((data) => {
      console.log('提交选择>>>服务器');
      onSetShopShoppingCar();
    });

    onClose();
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      goodsNum: minNum || 1,
    });
  }, []);
  return (
    <>
      <div className="goods-des">
        <Image src={image} width="100%" fit="cover" style={{ borderRadius: 4 }} />
        <div>
          <div className="goods-des-title">
            {title}
            <CloseOutline onClick={onClose} />
          </div>
          <div className="goods-des-chosen">已选：麻辣</div>
          <div className="goods-des-price">￥{price}</div>
        </div>
      </div>
      <Form className="goods-details" onFinish={onFinish} form={form}>
        <Form.Item layout="horizontal" className="goods-details-num" name="goodsNum" label="数量">
          <Stepper min={minNum || 1} max={maxNum} />
        </Form.Item>
        {details?.map((item) => (
          <Form.Item
            key={item.id}
            name={item.name}
            label={item.name}
            rules={[{ required: true, message: `请选择${item.name}` }]}
          >
            <Selector
              className="goods-details-select"
              options={item.params.map((ele) => ({ label: ele, value: ele }))}
            />
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            type="submit"
            block
            color="primary"
            shape="rounded"
            style={{ position: 'fixed', bottom: '1rem', width: '94%' }}
          >
            选好了
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ShopGoodsDetailsCard;
