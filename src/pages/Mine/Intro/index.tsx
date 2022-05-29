import { NavBar, TextArea, Button } from 'antd-mobile';
import { useState } from 'react';
import './index.less';
import request from 'utils/request';
const Intro = () => {
  const [intro, setIntro] = useState('');
  return (
    <div className="intro-edit">
      <NavBar
        right={
          <Button onClick={() => request('mock/test.json', 'PUT', { intro }).then((data) => console.log(data))}>
            保存
          </Button>
        }
        onBack={() => window.history.go(-1)}
      >
        修改昵称
      </NavBar>
      <TextArea placeholder="请输入简介" showCount maxLength={20} onChange={(val) => setIntro(val)} />
    </div>
  );
};
export default Intro;
