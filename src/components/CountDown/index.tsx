import { FC, useEffect, useRef, useState } from 'react';
import moment from 'moment';

const CountDown: FC<{
  /** 单位秒 */
  diff: number;
  endCountDown: any;
}> = ({ diff, endCountDown }) => {
  const [restTime, setRestTime] = useState(diff);
  let timer: any;
  useEffect(() => {
    if (restTime && restTime !== 0) {
      timer = setTimeout(() => {
        setRestTime((time) => time - 1);
      }, 1000);
    } else if (restTime === 0) {
      endCountDown();
    }
    return () => {
      clearTimeout(timer);
    };
  });
  return <>{moment().second(restTime).format('ss')}</>;
};
export default CountDown;
