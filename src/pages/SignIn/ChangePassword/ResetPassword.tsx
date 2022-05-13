import React, { Suspense, useState, useEffect } from 'react';
import { Form, Input, Button, Radio, Toast, Modal, Checkbox, Dialog } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import './index.less';
import request from 'utils/request';

const ResetPassword = () => {
  const [canSubmit, setCanSubmit] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const passwordReg = /^(?=.*\w)(?=.*\w)\w{6,20}$/;

  const [form] = Form.useForm();

  const onFinish = ({ ...values }) => {
    const searchParams = {
      password: values.newPassword,
    };
    if (passwordReg.test(values.newPassword)) {
      request('mock/test.json', 'POST', searchParams).then((data) => console.log(data));
    } else {
      Toast.show({
        content: '密码必须是6-20个英文字母、数字或符号（除空格），且字母、数字和标点符号至少包含两种',
      });
    }
  };

  const onValChange = (changed: { isShowPassword: boolean }, all: { newPassword: string; confirmPassword: string }) => {
    if (all.newPassword === all.confirmPassword) setCanSubmit(true);
    else setCanSubmit(false);
    if (changed.hasOwnProperty('isShowPassword')) setIsShowPassword(changed.isShowPassword);
    console.log(changed.isShowPassword);
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
        <div>必须是6-20个英文字母、数字或符号（除空格），且字母、数字和标点符号至少包含两种</div>
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
