import { FC, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const Countdown: FC<{
  /** 单位秒 */
  diff: number;
  onEnd: () => void;
}> = ({ diff, onEnd }) => {
  const [restTime, setRestTime] = useState(diff);
  const ref = useRef<any>();

  console.log('diff', diff);
  useEffect(() => {
    let tmp = diff;
    setRestTime(diff);
    ref.current = setInterval(() => {
      setRestTime(--tmp);
      if (!tmp) {
        console.log('清除计时器');
        clearInterval(ref.current);
        onEnd();
      }
    }, 1000);

    return () => {
      console.log('清除计时器卸载时');
      clearInterval(ref.current);
      onEnd();
    };
  }, [diff]);

  return (
    <>
      {dayjs
        .duration({
          seconds: restTime,
        })
        .format('ss')}
    </>
  );
};
export default Countdown;
