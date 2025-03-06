'use client';

import { memo } from 'react';

interface ImageProps {
  url: string;
}

export const RecipeImage = memo(({ url }: ImageProps) => {
  return (
    <div className='relative w-full sm:w-3/4 lg:w-2/5 h-80 flex justify-center items-center rounded-2xl overflow-hidden'>
      <img
        className='absolute w-full h-full object-cover hoverable:hover:scale-110 active:scale-110 transition-transform duration-500 ease-in-out'
        src={url}
        alt='recipe image'
      />
    </div>
  );
});
