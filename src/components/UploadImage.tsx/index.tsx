import React, { FC, useState } from 'react';
import { ImageUploader, Space, Toast, Dialog } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';

const sleep = async (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, time);
  });
};

async function mockUpload(file: File) {
  await sleep(3000);
  return {
    url: URL.createObjectURL(file),
  };
}

// 基础用法
const Basic: FC = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([
    {
      url: 'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
    },
  ]);

  return <ImageUploader value={fileList} onChange={setFileList} upload={mockUpload} />;
};

export default () => {
  return (
    <>
      <Basic />
    </>
  );
};
