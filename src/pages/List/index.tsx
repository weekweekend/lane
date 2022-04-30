import { memo, FC } from 'react';
import { Link } from 'react-router-dom';

const List: FC<{}> = () => {
  return (
    <div>
      <h1>List</h1>
      <p>This is list page.</p>

      {[...new Array(20)].map((_, index) => (
        <p key={index}>
          <Link to={`/item/${index}`}>item-{index}</Link>
        </p>
      ))}
    </div>
  );
};

export default memo(List);
