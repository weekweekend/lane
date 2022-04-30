import { memo, FC } from 'react';

const Welcome: FC<{}> = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is welcome page.</p>
    </div>
  );
};

export default memo(Welcome);
