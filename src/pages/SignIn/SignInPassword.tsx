import React, { Suspense, useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Toast, Modal, Checkbox } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import './index.less';
import request from 'utils/request';

const SignInPassword = () => {
  const [canSubmit, setCanSubmit] = useState(false);

  const [form] = Form.useForm();

  const onPasswordFinish = ({ ...values }) => {
    const searchParams = {
      userName: values.username,
      password: values.password,
    };
    if (values.username && values.password && values.agree)
      request('loginByPassword', 'POST', searchParams, { 'Content-Type': 'application/json' }, false)?.then((data) => {
        if (data.success) {
          console.log(data);
          localStorage.setItem('token', data.data);
          window.location.href = '#/mine';
        }
      });
    if (!values.username) {
      Toast.show({
        content: '请输入用户名',
        position: 'top',
      });
    }
    if (!values.password) {
      Toast.show({
        content: '请输入密码',
        position: 'top',
      });
    }
    if (!values.agree) {
      Modal.show({
        bodyClassName: 'agree',
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
              request('loginByPassword', 'POST', searchParams, { 'Content-Type': 'application/json' }, false)?.then(
                (data) => {
                  if (data.success) {
                    console.log(data);
                    localStorage.setItem('token', data.data);
                    window.location.href = '#/mine';
                  }
                },
              );
            },
          },
        ],
      });
    }
  };

  const onValChange = ({ ...changed }, { ...all }) => {
    if (all.username && all.password) {
      setCanSubmit(true);
    }
  };

  return (
    <Form
      className="sign-in"
      layout="horizontal"
      mode="card"
      form={form}
      onFinish={onPasswordFinish}
      onValuesChange={onValChange}
    >
      <Form.Header>密码登陆</Form.Header>
      <Form.Item name="username">
        <Input placeholder="用户名" clearable />
      </Form.Item>
      <Form.Item name="password">
        <Input placeholder="密码" clearable type="password" />
      </Form.Item>
      <Form.Item>
        <Button block color="primary" shape="rounded" size="large" type="submit" disabled={!canSubmit}>
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
