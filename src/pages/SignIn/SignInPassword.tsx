import { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Toast, Modal } from 'antd-mobile';
import './index.less';
import request from 'utils/request';

const SignInPassword = () => {
  const [canSubmit, setCanSubmit] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const passwordReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{6,18}$/;
  const usernameReg = /^[a-zA-Z0-9_-]{4,16}$/;
  useEffect(() => {
    form.setFieldsValue({
      username: 18651379793,
      password: `asd12345&`,
    });
  }, []);
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
            style: {
              textAlign: 'center',
              width: `45%`,
              fontSize: `0.8rem`,
              border: `1px solid #ccc`,
              color: `#333`,
            },
          },
          {
            key: 'agree',
            text: '同意',
            primary: true,
            style: {
              textAlign: 'center',
              width: `45%`,
              fontSize: `0.8rem`,
            },
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
    if (changed.hasOwnProperty('password')) {
      setCanSubmit(passwordReg.test(changed.password) && all.username);
    }
    if (changed.hasOwnProperty('username')) {
      setCanSubmit(usernameReg.test(changed.username) && all.password);
    }
    if (changed.hasOwnProperty('isShowPassword')) {
      setIsShowPassword(changed.isShowPassword);
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
        <Input placeholder="密码" clearable type={isShowPassword ? 'text' : 'password'} />
      </Form.Item>
      <Form.Item name="isShowPassword">
        <Checkbox
          style={{
            '--icon-size': '.8rem',
            '--font-size': '.7rem',
            '--gap': '.5rem',
            marginTop: '.5rem',
            lineHeight: 1.5,
          }}
        >
          显示密码
        </Checkbox>
      </Form.Item>
      <Form.Item className="border-none">
        <Button block color="primary" shape="rounded" size="large" type="submit" disabled={!canSubmit}>
          登 录
        </Button>
      </Form.Item>
      <Form.Item className="border-none">
        <a href="#/signIn/changePassword">忘记密码</a>
      </Form.Item>
      <Form.Item name="agree" className="border-none position-bottom">
        <Checkbox
          style={{
            '--icon-size': '.8rem',
            '--font-size': '.7rem',
            '--gap': '.5rem',
            lineHeight: 1.5,
          }}
        >
          已阅读并同意《用户服务协议》、《隐私政策》
        </Checkbox>
      </Form.Item>
    </Form>
  );
};
export default SignInPassword;
