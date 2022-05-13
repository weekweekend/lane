import React, { Suspense, useState, useEffect, FC } from 'react';
import { Form, Input, Button, Radio, Toast, Modal, Checkbox, Dialog } from 'antd-mobile';
import { InformationCircleOutline } from 'antd-mobile-icons';
import './index.less';
import request from 'utils/request';
import Countdown from 'components/Countdown';

const VerifyNumber: FC<{ phone: string; onVerifyNumber: () => void }> = ({ phone, onVerifyNumber }) => {
  const [canGetCode, setCanGetCode] = useState(true);
  const [isShowCountdown, setIsShowCountdown] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const codeReg = /^\d{6}$/;

  const [form] = Form.useForm();

  const onFinish = ({ ...values }) => {
    const searchParams = {
      phone: phone,
      code: values.code,
    };
    request('mock/isNumberExist.json', 'POST', searchParams).then((data) => data.data && onVerifyNumber());
  };

  const getCode = () => {
    request('mock/getCode.json', 'GET', { phone: phone }).then((data) => console.log(data));
    setIsShowCountdown(true);
    setCanGetCode(false);
  };

  const onValuesChange = (changed: { code: string }) => {
    if (codeReg.test(changed.code)) setCanSubmit(true);
    else setCanSubmit(false);
  };

  return (
    <Form layout="horizontal" mode="card" form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
      <Form.Header>
        <div style={{ fontSize: '0.6rem', color: '#888' }}>
          <InformationCircleOutline />
          为确保是你本人操作，请完成以下验证
        </div>
        <div style={{ fontSize: '0.7rem', color: '#666', margin: '0.5rem 0' }}>我们已经发送了校验码到你的手机：</div>
        <div style={{ fontSize: '1rem', color: '#333' }}>
          {/^\d{3}/.exec(phone)}******{/\d{2}$/.exec(phone)}
        </div>
      </Form.Header>
      <Form.Item
        name="code"
        extra={
          isShowCountdown ? (
            <Button color="primary" fill="outline" size="small" disabled>
              <Countdown
                diff={59}
                onEnd={() => {
                  setIsShowCountdown(false);
                  setCanGetCode(true);
                }}
              />
              &nbsp;s
            </Button>
          ) : (
            <Button color="primary" fill="outline" size="small" disabled={!canGetCode} onClick={getCode}>
              获取短信校验码
            </Button>
          )
        }
      >
        <Input placeholder="验证码" clearable />
      </Form.Item>
      <Form.Item>
        <Button block color="primary" size="large" type="submit" disabled={!canSubmit}>
          下一步
        </Button>
      </Form.Item>
    </Form>
  );
};
export default VerifyNumber;
