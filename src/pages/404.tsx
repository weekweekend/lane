import { memo, FC } from 'react';
import { ErrorBlock } from 'antd-mobile';

const Page404: FC<{}> = () => {
  return <ErrorBlock status="empty" fullPage description={'页面不存在'} />;
};

export default memo(Page404);
