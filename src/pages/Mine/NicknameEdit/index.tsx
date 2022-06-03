import { NavBar, Input, Button } from 'antd-mobile';
import { useState } from 'react';
import './index.less';
import request from 'utils/request';
const NicknameEdit = () => {
  const [nickname, setNickname] = useState('');
  return (
    <div className="nickname-edit">
      <NavBar
        right={
          <Button onClick={() => request('mock/test.json', 'PUT', { nickname }).then((data) => console.log(data))}>
            保存
          </Button>
        }
        onBack={() => history.back()}
      >
        修改昵称
      </NavBar>
      <Input placeholder="请输入内容" value={nickname} onChange={(val) => setNickname(val)} />
      <p>限2~12个中文、英文或数字</p>
    </div>
  );
};
export default NicknameEdit;
