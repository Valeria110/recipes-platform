import { clockSvg } from '@/shared/assets';
import Image from 'next/image';
import { memo } from 'react';

interface IProps {
  cookingTime: number;
}

export const CookingTimeInfo = memo(({ cookingTime }: IProps) => {
  const transformTime = (totalMinutes: number) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;

    if (h > 0 && m > 0) return `${h} h ${m} min`;
    if (h > 0) return `${h} h`;
    return `${m} min`;
  };

  return (
    <div className='flex items-center gap-2 text-orange-400'>
      <Image src={clockSvg} width={25} alt='clock svg image' />
      <span className='text-xs'>{transformTime(cookingTime) ?? '30 min'}</span>
    </div>
  );
});
