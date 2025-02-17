'use client';

import { memo } from 'react';

interface ImageProps {
  url: string | File;
}

export const RecipeImage = memo(({ url }: ImageProps) => {
  let imageSrc = typeof url === 'string' ? url : url instanceof File ? URL.createObjectURL(url) : null;

  if (!imageSrc) {
    const imageBase64 = sessionStorage.getItem('imageBase64');
    if (imageBase64) {
      imageSrc = imageBase64;
    } else {
      return null;
    }
  }

  return (
    <div className='relative w-full sm:w-3/4 lg:w-2/5 h-80 flex justify-center items-center rounded-2xl overflow-hidden'>
      <img
        className='absolute w-full h-full object-cover hoverable:hover:scale-110 active:scale-110 transition-transform duration-500 ease-in-out'
        src={imageSrc}
        alt='recipe image'
      />
    </div>
  );
});
