import React, { Suspense, useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Toast, Modal, Checkbox } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import './index.less';
import { get } from 'utils/request';
import CountDown from 'components/CountDown';

const SignInCode = (props: { show: string }) => {
  const [getCode, setGetCode] = useState(false);
  const [timeShow, setTimeShow] = useState(false);
  const [submitCode, setSubmitCode] = useState(false);

  const phoneReg = /^1[3-9]\d{9}$/;
  const codeReg = /^\d{6}$/;

  const [form] = Form.useForm();

  const onCodeFinish = ({ ...values }) => {
    console.log(values);
    if (!values.agree) {
      Modal.show({
        content:
          '未注册手机号登录后自动生成账号，请您认真阅读《用户服务协议》和《隐私政策》的全部条款，接收后可开始使用我们的服务',
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
              phoneReg.test(values.phone) &&
                codeReg.test(values.code) &&
                get('mock/test.json').then((data) => console.log(data));
            },
          },
        ],
      });
    }
    values.agree &&
      phoneReg.test(values.phone) &&
      codeReg.test(values.code) &&
      get(`mock/test.json`).then((data) => console.log(data));
  };

  const onCodeValChange = ({ ...changed }, { ...all }) => {
    if (changed.hasOwnProperty('phone')) {
      setGetCode(phoneReg.test(all.phone));
    }
    phoneReg.test(all.phone) && codeReg.test(all.code) && setSubmitCode(true);
  };

  const getCodeClick = () => {
    const val = form.getFieldValue('phone');
    console.log(val);
    get(`mock/test.json`).then((data) => console.log(data));
    setTimeShow(true);
    setGetCode(false);
  };

  return (
    <Form
      layout="horizontal"
      mode="card"
      form={form}
      onFinish={onCodeFinish}
      onValuesChange={onCodeValChange}
      style={{ display: props.show }}
    >
      <Form.Header>手机号登陆</Form.Header>
      <Form.Item name="phone">
        <Input placeholder="请输入手机号" clearable={true} />
      </Form.Item>
      <Form.Item
        name="code"
        extra={
          timeShow ? (
            <Button color="primary" fill="outline" shape="rounded" size="mini" disabled>
              已发送（
              <CountDown
                diff={59}
                endCountDown={() => {
                  setTimeShow(false);
                  setGetCode(true);
                }}
              />
              s）
            </Button>
          ) : (
            <Button
              color="primary"
              fill="outline"
              shape="rounded"
              size="mini"
              disabled={!getCode}
              onClick={getCodeClick}
            >
              发送验证码
            </Button>
          )
        }
      >
        <Input placeholder="验证码" clearable={true} />
      </Form.Item>
      <Form.Item>
        <Button block color="primary" shape="rounded" size="large" type="submit" disabled={!submitCode}>
          登 录
        </Button>
      </Form.Item>
      <Form.Item name="agree" className="border-none">
        <Radio
          style={{
            '--icon-size': '.8rem',
            '--font-size': '.7rem',
            '--gap': '.5rem',
            lineHeight: 1.5,
          }}
        >
          未注册手机号登陆后将自动生成账号，且代表你以阅读并同意《用户服务协议》、《隐私政策》
        </Radio>
      </Form.Item>
    </Form>
  );
};
export default SignInCode;
