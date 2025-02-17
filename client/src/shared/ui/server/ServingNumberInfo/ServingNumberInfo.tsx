import { peopleSvg } from '@/shared/assets';
import Image from 'next/image';
import { memo } from 'react';

interface IProps {
  peopleNum: number;
}

export const ServingNumberInfo = memo(({ peopleNum }: IProps) => {
  return (
    <div className='flex items-center gap-2 text-orange-400'>
      <Image src={peopleSvg} width={25} alt='people svg image' />
      <span className='text-xs'>{`${peopleNum} people`}</span>
    </div>
  );
});
