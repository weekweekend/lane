import { Button, NavBar, Form, Input, TextArea, Radio, Rate, Space, Toast, Selector, Image } from 'antd-mobile';
import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { LeftOutline } from 'antd-mobile-icons';
import { MdPhoneAndroid } from 'react-icons/md';
import OrderCard from 'components/OrderCard';
import request from 'utils/request';
import UploadImage from 'components/UploadImage.tsx';

const AddEvaluation = () => {
  const [orderMess, setOrderMess] = useState<any>({});
  const OrderId = new URLSearchParams(window.location.hash.split('?')[1]).get('orderId');

  useEffect(() => {
    request('mock/getOneOrder.json', 'GET', { OrderId: OrderId }).then((data) => setOrderMess(data.data));
  }, [OrderId]);

  return (
    <div className="add-evaluation">
      <div className="add-evaluation-nav">
        <NavBar
          right={
            <Button color="primary" shape="rounded" size="mini">
              发布评价
            </Button>
          }
          onBack={() => window.history.go(-1)}
        >
          订单评价
        </NavBar>
      </div>
      <div className="add-evaluation-content">
        <div className="title">
          <Image src={orderMess.image}></Image>
          <h3>{orderMess.shopName}</h3>
        </div>
        <Form layout="horizontal" mode="card">
          <Form.Item label="满意度">
            <Rate />
          </Form.Item>
          <Form.Item label="包装">
            <Rate />
          </Form.Item>
          <Form.Item label="味道">
            <Rate />
          </Form.Item>
          <Form.Item label="配送">
            <Rate />
          </Form.Item>
          <Form.Item>
            <TextArea placeholder="满意你就夸一夸" />
          </Form.Item>
          <Form.Item>
            <UploadImage />
          </Form.Item>
          <Form.Item>
            <Radio>是否匿名</Radio>
          </Form.Item>
          <Form.Item label="推荐的菜品" layout="vertical">
            <Selector
              options={[
                {
                  label: '选项一',
                  value: '1',
                },
                {
                  label: '选项二',
                  value: '2',
                },
                {
                  label: '选项三',
                  value: '3',
                },
              ]}
              multiple={true}
              onChange={(arr, extend) => console.log(arr, extend.items)}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default AddEvaluation;
