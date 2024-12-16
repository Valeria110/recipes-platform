'use client';

import Image from 'next/image';
import foodImage from '../../../public/foog-image.jpg';
import starSvg from '../../../public/svg/heart-empty-svg.svg';
import clockSvg from '../../../public/svg/clock.svg';
import peopleSvg from '../../../public/svg/people.svg';
import starClickedSvg from '../../../public/svg/heart-clicked.svg';
import { useState } from 'react';

export const RecipeCard = () => {
  const [isFave, setIsFave] = useState(false);

  const handleStarClick = () => {
    setIsFave(!isFave);
  };

  const handleCardCLick = () => {
    // redirect to the recipe page
  };

  return (
    <div
      className='recipe-card flex flex-col gap-2 w-72 lg:w-52 p-2 shadow-lg rounded-xl bg-white hover:cursor-pointer'
      onClick={handleCardCLick}
    >
      <div className='relative overflow-hidden flex justify-center items-center w-full h-44 rounded-xl'>
        <Image
          className='absolute object-cover hoverable:hover:scale-110 active:scale-110 hover:cursor-pointer transition-transform duration-500 ease-in-out'
          src={foodImage}
          width={400}
          alt='food image'
        />
      </div>
      <h4 className='font-semibold hover:underline'>Recipe Name</h4>

      <div className='flex justify-between items-center'>
        <div className='flex flex-col text-gray-400'>
          <span className='text-xs'>created by</span>
          <span className='text-sm'>Author Name</span>
        </div>

        <button onClick={handleStarClick} className='p-1 w-8'>
          <Image src={isFave ? starClickedSvg : starSvg} width={25} alt='star svg' />
        </button>
      </div>

      <div className='flex items-center gap-2 mt-2 text-orange-400'>
        <Image src={clockSvg} width={25} alt='clock svg image' />
        <span className='text-xs'>50 min</span>
        <span className='text-xs'>|</span>
        <Image src={peopleSvg} width={25} alt='people svg image' />
        <span className='text-xs'>4 people</span>
      </div>
    </div>
  );
};
