import { memo } from 'react';
import { CiClock2 } from 'react-icons/ci';

interface IProps {
  time: number;
}

export const TimeInfo = memo(({ time }: IProps) => {
  const transformTime = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;

    if (h > 0 && m > 0) return `${h} h ${m} min`;
    if (h > 0) return `${h} h`;
    return `${m} min`;
  };

  return (
    <div className='flex items-center gap-2 text-orange-400'>
      <CiClock2 size={25} />
      <span className='text-xs'>{transformTime(time) ?? '30 min'}</span>
    </div>
  );
});
