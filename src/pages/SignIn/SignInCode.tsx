import { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Toast, Modal } from 'antd-mobile';
import './index.less';
import request from 'utils/request';
import Countdown from 'components/Countdown';

const SignInCode = () => {
  const [canGetCode, setCanGetCode] = useState(true);
  const [isShowCountdown, setIsShowCountdown] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      phone: 18651379793,
      code: 123456,
    });
  }, []);
  const phoneReg = /^1[3-9]\d{9}$/;
  const codeReg = /^\d{6}$/;

  const [form] = Form.useForm();

  const onFinish = ({ ...values }) => {
    const searchParams = {
      phone: values.phone,
      emailCode: values.code,
    };
    if (phoneReg.test(values.phone) && codeReg.test(values.code) && values.agree)
      request('loginByCode', 'POST', searchParams, { 'Content-Type': 'application/json' }, false)?.then((data) => {
        if (data.success) {
          console.log(data);
          localStorage.setItem('token', data.data);
          window.location.href = '#/mine';
        }
      });

    if (!phoneReg.test(values.phone)) {
      Toast.show({
        content: '请检查手机号码是否正确',
        position: 'top',
      });
      return;
    }
    if (!codeReg.test(values.code)) {
      Toast.show({
        content: '验证码错误',
        position: 'top',
      });
      return;
    }
    if (!values.agree) {
      Modal.show({
        bodyClassName: 'agree',
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
              request('loginByCode', 'POST', searchParams, { 'Content-Type': 'application/json' }, false)?.then(
                (data) => {
                  if (data.success) {
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
    if (changed.hasOwnProperty('phone')) {
      setCanGetCode(phoneReg.test(all.phone));
    }
    if (phoneReg.test(all.phone) && codeReg.test(all.code)) setCanSubmit(true);
    else setCanSubmit(false);
  };

  const getCode = () => {
    const val = form.getFieldValue('phone');
    console.log(val);
    request('getCode', 'GET', { phone: val }, {}, false)?.then((data) => {
      console.log(data);
      if (data.success) {
        setIsShowCountdown(true);
        setCanGetCode(false);
      } else {
        Toast.show({
          content: '发送失败',
        });
      }
    });
  };

  return (
    <Form
      className="sign-in"
      layout="horizontal"
      mode="card"
      form={form}
      onFinish={onFinish}
      onValuesChange={onValChange}
    >
      <Form.Header>手机号登陆</Form.Header>
      <Form.Item name="phone">
        <Input placeholder="请输入手机号" clearable />
      </Form.Item>
      <Form.Item
        name="code"
        extra={
          isShowCountdown ? (
            <Button color="primary" fill="outline" shape="rounded" size="small" disabled>
              已发送（
              <Countdown
                diff={59}
                onEnd={() => {
                  setIsShowCountdown(false);
                  setCanGetCode(true);
                }}
              />
              s）
            </Button>
          ) : (
            <Button color="primary" fill="outline" shape="rounded" size="mini" disabled={!canGetCode} onClick={getCode}>
              发送验证码
            </Button>
          )
        }
      >
        <Input placeholder="验证码" clearable />
      </Form.Item>
      <Form.Item>
        <Button block color="primary" shape="rounded" size="large" type="submit" disabled={!canSubmit}>
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
