import { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Toast } from 'antd-mobile';
import './index.less';
import request from 'utils/request';

const ResetPassword = () => {
  const [canSubmit, setCanSubmit] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const passwordReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{6,18}$/;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      newPassword: `asd2345&`,
      confirmPassword: `asd2345&`,
    });
  }, []);
  const onFinish = ({ ...values }) => {
    const searchParams = {
      password: values.newPassword,
    };
    if (passwordReg.test(values.newPassword)) {
      request('loginByPassword', 'POST', searchParams, { 'Content-Type': 'application/json' }, false)?.then((data) => {
        if (data.success) {
          console.log(data);
          localStorage.setItem('token', data.data);
          window.location.href = '#/mine';
        }
      });
    } else {
      Toast.show({
        content: '密码至少包含字母、数字和特殊字符中的两种(不含空格), 且在6-18位之间',
      });
    }
  };

  const onValChange = (changed: { isShowPassword: boolean }, all: { newPassword: string; confirmPassword: string }) => {
    if (all.newPassword === all.confirmPassword) setCanSubmit(true);
    else setCanSubmit(false);
    if (changed.hasOwnProperty('isShowPassword')) setIsShowPassword(changed.isShowPassword);
  };

  return (
    <Form layout="horizontal" mode="card" form={form} onFinish={onFinish} onValuesChange={onValChange}>
      <Form.Item name="newPassword">
        <Input placeholder="输入新密码" clearable type={isShowPassword ? 'text' : 'password'} />
      </Form.Item>
      <Form.Item name="confirmPassword">
        <Input placeholder="确认新密码" clearable type={isShowPassword ? 'text' : 'password'} />
      </Form.Item>
      <Form.Item>
        <div>密码至少包含字母、数字和特殊字符中的两种(不含空格), 且在6-18位之间</div>
      </Form.Item>
      <Form.Item name="isShowPassword" className="border-none">
        <Radio
          defaultChecked
          style={{
            '--icon-size': '.8rem',
            '--font-size': '.7rem',
            '--gap': '.5rem',
            marginTop: '.5rem',
            lineHeight: 1.5,
          }}
        >
          显示密码
        </Radio>
      </Form.Item>
      <Form.Item className="border-none">
        <Button block color="primary" size="large" type="submit" disabled={!canSubmit}>
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ResetPassword;
