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

  useEffect(() => {
    ref.current = setInterval(() => {
      setRestTime(--diff);
      if (!diff) {
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
  }, []);

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
