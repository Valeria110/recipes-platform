'use client';

import { peopleSvg } from '@/shared/assets';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { memo } from 'react';

interface IProps {
  peopleNum: number;
}

export const ServingNumberInfo = memo(({ peopleNum }: IProps) => {
  const t = useTranslations('RecipeCard');
  return (
    <div className='flex items-center gap-2 text-orange-400'>
      <Image src={peopleSvg} width={25} alt='people svg image' />
      <span className='text-xs'>{`${peopleNum} ${t('ServingNumberInfo')}`}</span>
    </div>
  );
});
