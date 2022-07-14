import { Button, NavBar, Form, TextArea, Radio, Rate, Space, ImageUploader, Selector, Image, Toast } from 'antd-mobile';
import { useState, useEffect } from 'react';
import './index.less';
import { useSearchParams } from 'react-router-dom';
import request from 'utils/request';

const AddEvaluation = () => {
  const [orderMess, setOrderMess] = useState<any>({});
  const [option, setOption] = useState([]);
  const [search] = useSearchParams();
  const OrderId = search.get('orderId');

  const [form] = Form.useForm();

  const scoreDes = (name: any) => (
    <>
      {form.getFieldValue(name) > 0 && form.getFieldValue(name) <= 1 && <div className="score-des">非常差</div>}
      {form.getFieldValue(name) > 1 && form.getFieldValue(name) <= 2 && <div className="score-des">差</div>}
      {form.getFieldValue(name) > 2 && form.getFieldValue(name) <= 3 && <div className="score-des">一般</div>}
      {form.getFieldValue(name) > 3 && form.getFieldValue(name) <= 4 && <div className="score-des">满意</div>}
      {form.getFieldValue(name) > 4 && form.getFieldValue(name) <= 5 && <div className="score-des">超赞</div>}
    </>
  );

  useEffect(() => {
    request('oneOrder', 'GET', { OrderId: OrderId }).then((data) => {
      setOrderMess(data.data);
      setOption(data.data.goods.map((item: any) => ({ label: item.name, value: item.name })));
    });
    form.setFieldsValue({
      anonymity: false,
    });
  }, [OrderId]);

  const onEvaluate = ({ ...values }) => {
    values.evaluationImage = values.evaluationImage?.map((item: any) => item.url);
    console.log(values);
    request('post', 'POST', values).then((data) => {
      if (data.success) {
        Toast.show({
          content: '提交成功',
          duration: 500,
        });
        console.log('提交评价 >>> 服务器');
        history.back();
      }
    });
  };

  async function mockUpload(file: File) {
    await sleep(2000);
    return {
      url: URL.createObjectURL(file),
    };
  }
  async function sleep(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ok');
      }, time);
    });
  }

  return (
    <div className="add-evaluation">
      <div className="add-evaluation-nav">
        <NavBar onBack={() => history.back()}>订单评价</NavBar>
      </div>
      <div className="add-evaluation-content">
        <div className="title">
          <Image src={orderMess.image}></Image>
          <h3>{orderMess.shopName}</h3>
        </div>
        <Form layout="horizontal" mode="card" form={form} onFinish={onEvaluate}>
          <Space align="center">
            <Form.Item
              label="满意度"
              name="satisfaction"
              rules={[{ required: true, message: '满意度评分评分不能为空' }]}
            >
              <Rate allowClear={false} />
            </Form.Item>
            {scoreDes('satisfaction')}
          </Space>
          <Space align="center">
            <Form.Item label="包装" name="packing" rules={[{ required: true, message: '包装评分不能为空' }]}>
              <Rate allowClear={false} />
            </Form.Item>
            {scoreDes('packing')}
          </Space>
          <Space align="center">
            <Form.Item label="味道" name="taste" rules={[{ required: true, message: '味道评分不能为空' }]}>
              <Rate allowClear={false} />
            </Form.Item>
            {scoreDes('taste')}
          </Space>
          <Space align="center">
            <Form.Item label="配送" name="delivery" rules={[{ required: true, message: '配送评分不能为空' }]}>
              <Rate allowClear={false} />
            </Form.Item>
            {scoreDes('delivery')}
          </Space>
          <Form.Item name="evaluationContent">
            <TextArea placeholder="满意你就夸一夸" />
          </Form.Item>
          <Form.Item name="evaluationImage">
            <ImageUploader upload={mockUpload} />
          </Form.Item>

          <Form.Item label="推荐的菜品" layout="vertical" name="recommendation">
            <Selector multiple={true} options={option} />
          </Form.Item>
          <div className="last-row">
            <Form.Item name="anonymity">
              <Radio>是否匿名</Radio>
            </Form.Item>
            <Form.Item name="anonymity">
              <Button color="primary" shape="rounded" size="small" type="submit">
                发布评价
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default AddEvaluation;
