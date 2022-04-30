import { memo, FC, useState, useEffect } from 'react';
import { getTuWei } from 'services/tuWei';

const TuWei: FC<{}> = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    getTuWei().then(setText);
  }, []);

  return <span>{text}</span>;
};

export default memo(TuWei);
