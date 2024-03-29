import { DownOutline } from 'antd-mobile-icons';
import { Form, Input, Button, Modal, Toast } from 'antd-mobile';
import './index.less';
import { useEffect, useState, FC } from 'react';
import request from 'utils/request';

const ProvideNumber: FC<{
  onProvideNumber: (phone: string) => void;
}> = ({ onProvideNumber }) => {
  const [curArea, setCurArea] = useState('中国大陆+86');
  const [areaList, setAreaList] = useState([]);
  const [curPhone, setCurphone] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      curArea: curArea,
      phone: 18651379793,
    });
    setCurphone('18651379793');
    request('area', 'GET', {}, {}, false)?.then((data) => setAreaList(data.data.rows));
  }, []);

  const onFinish = ({ ...values }) => {
    request('isAccount', 'GET', { phone: values.phone }, {}, false).then((data) => {
      if (data.data) {
        onProvideNumber(values.phone);
      } else {
        Toast.show({
          content: '账户不存在，请更换',
        });
      }
    });
  };

  const onClick = () => {
    const list = areaList.map((item) => ({
      key: item,
      text: item,
      onClick: () => {
        form.setFieldsValue({ CurArea: item });
        setCurArea(item);
      },
    }));

    Modal.show({
      closeOnAction: true,
      actions: list,
    });
  };

  return (
    <>
      <Form
        layout="horizontal"
        mode="card"
        form={form}
        onFinish={onFinish}
        onValuesChange={(changed, all) => setCurphone(all.phone)}
      >
        <Form.Header>请输入手机号码</Form.Header>
        <Form.Item name="curArea" className="border-none">
          <Button block color="primary" size="large" fill="none" className="choose" onClick={onClick}>
            {curArea}
            <DownOutline />
          </Button>
        </Form.Item>
        <Form.Item name="phone">
          <Input placeholder="手机号码" clearable />
        </Form.Item>
        <Form.Item>
          <Button
            block
            color="primary"
            shape="rounded"
            size="large"
            type="submit"
            disabled={!/^1[3-9]\d{9}$/.test(curPhone)}
          >
            确 认
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ProvideNumber;
