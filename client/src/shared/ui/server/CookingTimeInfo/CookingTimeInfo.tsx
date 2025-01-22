import { clockSvg } from '@/shared/assets';
import Image from 'next/image';

interface IProps {
  cookingTime: number;
}

export const CookingTimeInfo = ({ cookingTime }: IProps) => {
  return (
    <div className='flex items-center gap-2 text-orange-400'>
      <Image src={clockSvg} width={25} alt='clock svg image' />
      <span className='text-xs'>{cookingTime ?? '30'}</span>
    </div>
  );
};
