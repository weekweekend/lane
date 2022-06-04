import { FC, Suspense, useEffect, useState } from 'react';
import { Tag, Image, Divider, NavBar, Form, Selector, Input, Button, Dialog, Radio } from 'antd-mobile';
import { CloseOutline, DeleteOutline } from 'antd-mobile-icons';
import './index.less';
import request from 'utils/request';

const AddressEdit = () => {
  const [addrSexValue, setAddrSexValue] = useState<string>();
  const paramsId = new URLSearchParams(useLocation().search).get('id');

  useEffect(() => {
    if (paramsId) {
      request('oldAddress', 'GET', { id: paramsId }).then((data) => {
        console.log('需要编辑的》》》', data.data);
        form.setFieldsValue({
          address: data.data.address,
          addressDetail: data.data.addrDetail,
          AddressTag: data.data.tag,
          addressName: data.data.name,
          addressSex: data.data.sex,
          AddressPhone: data.data.phone,
        });
      });
    }
  }, [paramsId]);

  const onSubmitAddress = ({ ...values }) => {
    if (!values.AddressTag || !values.AddressTag.length) delete values.AddressTag;
    console.log('提交的数据》》》', values);
    paramsId
      ? request('put', 'PUT', { id: paramsId, ...values }).then((data) => {
          console.log('编辑了》》》', data);
          if (data.success) history.back();
        })
      : request('post', 'POST', values).then((data) => {
          console.log('新增了》》》', data);
          if (data.success) history.back();
        });
  };

  const [form] = Form.useForm();

  return (
    <div className="address-edit">
      <NavBar
        className="address-nav"
        onBack={() => history.back()}
        right={
          paramsId && (
            <DeleteOutline
              fontSize={'1rem'}
              onClick={() =>
                request('delete', 'DELETE', { id: paramsId }).then((data) => {
                  if (data.success) {
                    console.log('删除了地址>>>', paramsId);
                    history.back();
                  }
                })
              }
            />
          )
        }
      >
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
            value={addrSexValue}
            onChange={(val) => {
              setAddrSexValue(val as string);
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
