'use client';

import Image from 'next/image';
import { foodImg } from '@/shared/assets';
import { clockSvg } from '@/shared/assets';
import { peopleSvg } from '@/shared/assets';
import { useEffect, useState } from 'react';
import { useUser } from '@/shared/hooks/useUser';
import { IFav } from '@/shared/model/fav';
import { favsService } from '@/shared/api';
import { HeartButton } from '@/shared/ui/client';
import { useRouter } from 'next/navigation';
import { Route } from '@/shared/types';
import { CookingTimeInfo, ServingNumberInfo } from '@/shared/ui/server';

interface IRecipeCardProps {
  imageUrl: string | null;
  title: string;
  authorId: string | null;
  cookingTime: number;
  ingredients: string[];
  instructions: string;
  recipeId: string;
  createdAt: string;
  updatedAt: string;
  favsData?: IFav[];
}

export const RecipeCard = ({ recipeId, imageUrl, title, authorId, cookingTime, favsData = [] }: IRecipeCardProps) => {
  const [isFave, setIsFave] = useState(false);
  const [favId, setFavId] = useState('');
  const [isHeartLoading, setIsHeartLoading] = useState(false);
  const { data, error, isLoading } = useUser(authorId);
  const router = useRouter();

  useEffect(() => {
    const isRecipeFav = async () => {
      if (Array.isArray(favsData) && favsData.length) {
        const fav = favsData.find((fav) => fav.recipeId === recipeId);
        if (fav) {
          setIsFave(true);
          setFavId(fav.id);
        }
      }
    };
    isRecipeFav();
  }, [favsData]);

  const handleHeartClick = async () => {
    const start = Date.now();
    const worker = new Worker(new URL('./heartWorker.ts', import.meta.url), {
      type: 'module',
    });
    if (isHeartLoading) return;
    setIsHeartLoading(true);

    try {
      if (!isFave) {
        setIsFave(true);

        const data = await favsService.addFav(recipeId);
        if (typeof data !== 'string' && 'id' in data) {
          setFavId(data.id);
          worker.postMessage({ action: 'add', favsData, data });
        } else {
          throw new Error('Favs adding error');
        }
      } else {
        setIsFave(false);

        const result = await favsService.removeFav(favId);
        if (result && result.success) {
          worker.postMessage({ action: 'remove', favsData, recipeId });
          setFavId('');
        } else {
          throw new Error('Favs removing error');
        }
      }
    } catch (error) {
      console.error('Fav updating error:', error);
      setIsFave((prev) => !prev);
    } finally {
      setIsHeartLoading(false);
      worker.terminate();
      console.log(`Время выполнения: ${Date.now() - start}ms`);
    }
  };

  const handleCardCLick = () => {
    // redirect to the recipe page
    router.push(`${Route.RECIPES}/${recipeId}`);
  };

  return (
    <div
      className='recipe-card flex flex-col flex-grow gap-2 w-64 h-full lg:min-w-52 lg:flex-grow-0 p-2 shadow-lg rounded-xl bg-white hover:cursor-pointer'
      onClick={handleCardCLick}
    >
      <div className='relative overflow-hidden flex justify-center items-center w-full h-44 rounded-xl'>
        <img
          className='absolute object-cover w-full h-full hoverable:hover:scale-110 active:scale-110 hover:cursor-pointer transition-transform duration-500 ease-in-out'
          src={imageUrl ?? foodImg.src}
          alt='food image'
        />
      </div>
      <h4 className='font-semibold hover:underline'>{title ?? 'Recipe Name'}</h4>

      <div className='flex justify-between items-center'>
        <div className='flex flex-col text-gray-400'>
          <span className='text-xs'>created by</span>
          <span className='text-sm'>{error || isLoading ? 'Unknown author' : data?.name}</span>
        </div>

        <HeartButton handleHeartClick={handleHeartClick} isFave={isFave} isHeartLoading={isHeartLoading} />
      </div>

      <div className='flex items-center gap-2 pt-2 mt-auto text-orange-400'>
        <CookingTimeInfo cookingTime={cookingTime} />
        <span className='text-xs'>|</span>
        <ServingNumberInfo peopleNum={4} />
      </div>
    </div>
  );
};
