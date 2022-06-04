import { NavBar, TextArea, Button, Toast } from 'antd-mobile';
import { useState } from 'react';
import './index.less';
import request from 'utils/request';
const Intro = () => {
  const [intro, setIntro] = useState('');
  return (
    <div className="intro-edit">
      <NavBar
        right={
          <Button
            onClick={() =>
              request('put', 'PUT', { intro }).then((data) => {
                if (data.success) {
                  Toast.show({
                    content: '修改成功',
                    duration: 500,
                  });
                  history.back();
                }
              })
            }
          >
            保存
          </Button>
        }
        onBack={() => history.back()}
      >
        修改昵称
      </NavBar>
      <TextArea placeholder="请输入简介" showCount maxLength={20} onChange={(val) => setIntro(val)} />
    </div>
  );
};
export default Intro;
