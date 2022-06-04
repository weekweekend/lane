import { NavBar, Input, Button, Toast } from 'antd-mobile';
import { useState } from 'react';
import './index.less';
import request from 'utils/request';
const NicknameEdit = () => {
  const [nickname, setNickname] = useState('');
  return (
    <div className="nickname-edit">
      <NavBar
        right={
          <Button
            onClick={() => {
              if (/^.{2,12}$/.test(nickname)) {
                request('put', 'PUT', { nickname }).then((data) => {
                  if (data.success) {
                    Toast.show({
                      content: '修改成功',
                      duration: 500,
                    });
                    history.back();
                  }
                });
              } else {
                Toast.show({
                  content: '限2~12个中文、英文或数字',
                });
              }
            }}
          >
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
