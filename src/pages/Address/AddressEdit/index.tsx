import { FC, Suspense, useEffect, useState } from 'react';
import { Tag, Image, Divider, NavBar, Form, Selector, Input, Button, Dialog, Radio } from 'antd-mobile';
import { CloseOutline, DownOutline } from 'antd-mobile-icons';
import './index.less';
import { Link } from 'react-router-dom';
import getSearchParams from 'utils/getSearchParams';
import request from 'utils/request';

const AddressEdit = () => {
  const [value, setValue] = useState<string>();
  const params = new URLSearchParams(window.location.hash.split('?')[1]);

  useEffect(() => {
    if (params.get('type')) {
      if (params.get('type') === 'edit' && params.get('id')) {
        request('mock/getOldAddr.json', 'GET', { id: params.get('id') }).then((data) => {
          console.log(data.data);
          form.setFieldsValue({
            address: data.data.address,
            addressDetail: data.data.addrDetail,
            AddressTag: data.data.tag,
            addressName: data.data.name,
            addressSex: data.data.sex,
            AddressPhone: data.data.phone,
          });
        });
      } else console.log('出错了出错了出错了》》》》');
    }
  }, [params.get('type'), params.get('id')]);

  const onSubmitAddress = ({ ...values }) => {
    if (!values.AddressTag || !values.AddressTag.length) delete values.AddressTag;
    console.log(values);
    params.get('type') === 'edit'
      ? request('mock/test.json', 'PUT', { id: params.get('id'), ...values }).then((data) => {
          console.log('编辑了》》》', data);
          if (data.data.msg === 'ok') window.location.href = '#/address';
        })
      : request('mock/test.json', 'POST', values).then((data) => {
          console.log('新增了》》》', data);
          if (data.data.msg === 'ok') window.location.href = '#/address';
        });
  };

  const [form] = Form.useForm();

  return (
    <div className="address-edit">
      <NavBar className="address-nav" onBack={() => window.history.go(-1)}>
        新增收货地址
      </NavBar>
      <Form
        className="address-edit-form"
        layout="horizontal"
        name="form"
        form={form}
        onFinish={onSubmitAddress}
        footer={
          <Button block type="submit" color="primary" size="large" shape="rounded">
            保存
          </Button>
        }
      >
        <Form.Item name="address" label="地址" rules={[{ required: true }]}>
          <Input placeholder="请输入收货地址" />
        </Form.Item>
        <Form.Item name="addressDetail" label="门牌号" rules={[{ required: true }]}>
          <Input placeholder="请输入详细地址" />
        </Form.Item>
        <Form.Item name="AddressTag" label="标签" className="address-select-tag">
          <Selector
            showCheckMark={false}
            columns={3}
            options={[
              { label: '家', value: '家' },
              { label: '公司', value: '公司' },
              { label: '学校', value: '学校' },
            ]}
          />
        </Form.Item>

        <Form.Item name="addressName" label="收货人" rules={[{ required: true }]}>
          <Input placeholder="姓名" />
        </Form.Item>
        <Form.Item className="address-sex" name="addressSex" label="性别" rules={[{ required: true }]}>
          <Radio.Group
            value={value}
            onChange={(val) => {
              setValue(val as string);
            }}
          >
            <Radio value="男">先生</Radio>
            <Radio value="女">女士</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="AddressPhone" label="手机号" rules={[{ required: true }]}>
          <Input placeholder="收货人手机号码" />
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddressEdit;