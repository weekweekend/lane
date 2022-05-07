import React, { Suspense, useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Toast, Modal, Checkbox } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import './index.less';
import { get } from 'utils/request';

const SignInPassword = (props: { show: string }) => {
  const [submitPassword, setSubmitPassword] = useState(false);

  const [form] = Form.useForm();

  const onPasswordFinish = ({ ...values }) => {
    if (!values.agree) {
      Modal.show({
        content: '请您认真阅读《用户服务协议》和《隐私政策》的全部条款，接收后可开始使用我们的服务',
        closeOnAction: true,
        actions: [
          {
            key: 'disagree',
            text: '不同意',
          },
          {
            key: 'agree',
            text: '同意',
            primary: true,
            onClick: () => {
              form.setFieldsValue({ agree: true });
              values.password && values.username && get('mock/test.json').then((data) => console.log(data));
            },
          },
        ],
      });
    }
    values.username && values.password && values.agree && get('mock/test.json').then((data) => console.log(data));
  };
  const onPasswordValChange = ({ ...changed }, { ...all }) => {
    console.log(changed);
    if (all.username && all.password) {
      setSubmitPassword(true);
    }
  };
  return (
    <Form
      layout="horizontal"
      mode="card"
      form={form}
      onFinish={onPasswordFinish}
      onValuesChange={onPasswordValChange}
      style={{ display: props.show }}
    >
      <Form.Header>密码登陆</Form.Header>
      <Form.Item name="username">
        <Input placeholder="用户名" clearable />
      </Form.Item>
      <Form.Item name="password">
        <Input placeholder="密码" clearable type="password" />
      </Form.Item>
      <Form.Item>
        <Button block color="primary" shape="rounded" size="large" type="submit" disabled={!submitPassword}>
          登 录
        </Button>
      </Form.Item>
      <Form.Item className="border-none">
        <a href="#/signIn/changePassword">忘记密码</a>
      </Form.Item>
      <Form.Item name="agree" className="border-none position-bottom">
        <Radio
          style={{
            '--icon-size': '.8rem',
            '--font-size': '.7rem',
            '--gap': '.5rem',
            lineHeight: 1.5,
          }}
        >
          已阅读并同意《用户服务协议》、《隐私政策》
        </Radio>
      </Form.Item>
    </Form>
  );
};
export default SignInPassword;
