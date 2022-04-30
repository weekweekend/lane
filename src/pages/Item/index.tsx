import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';

const Item: FC<{}> = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Item</h1>
      <p>Hey! You are watching item-{id}</p>
    </div>
  );
};

export default memo(Item);
