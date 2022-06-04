import { FC, useEffect, useState } from 'react';
import { Image, Button, Popup, Stepper, Selector, Form } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { BiMedal } from 'react-icons/bi';
import request from 'utils/request';
import Item from 'antd-mobile/es/components/dropdown/item';

export interface IShopXXXProps {
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
  curNum: number;
  setCurNum: (val: number) => void;
  onSetShopShoppingCartData: () => void;
}

const ShopGoodsSelectCard: FC<IShopXXXProps> = ({
  onClose,
  image,
  title,
  price,
  minNum,
  maxNum,
  details,
  onSetShopShoppingCartData,
  curNum,
  setCurNum,
}) => {
  const [goodsNum, setGoodsNum] = useState(0);
  const [tasteVal, setTasteVal] = useState();
  const [shoppingCart, setShoppingCart] = useState<any>({});

  const onFinish = ({ ...values }) => {
    request('put', 'PUT', values).then((data) => {
      if (data.success) {
        console.log('提交选择>>>服务器');
        onSetShopShoppingCartData();
        setCurNum(curNum + values.goodsNum);
      }
    });

    onClose();
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const init = details?.map((item) => ({ [item.name]: [item.params[0]] })) || [];
    form.setFieldsValue(
      Object.assign(
        {
          goodsNum: minNum || 1,
        },
        ...init,
      ),
    );
  });
  return (
    <>
      <div className="goods-des">
        <Image src={image} width="100%" fit="cover" style={{ borderRadius: 4 }} />
        <div>
          <div className="goods-des-title">
            {title}
            <CloseOutline onClick={onClose} />
          </div>
          <div className="goods-des-price">￥{price.toFixed(2)}</div>
        </div>
      </div>
      <Form className="goods-select" onFinish={onFinish} form={form}>
        <Form.Item layout="horizontal" className="goods-select-num" name="goodsNum" label="数量">
          <Stepper
            min={minNum || 1}
            max={maxNum}
            onChange={(val) => {
              console.log(val);
            }}
          />
        </Form.Item>
        {details?.map((item) => (
          <Form.Item
            key={item.id}
            name={item.name}
            label={item.name}
            rules={[{ required: true, message: `请选择${item.name}` }]}
          >
            <Selector
              className="goods-select-select"
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
export default ShopGoodsSelectCard;
