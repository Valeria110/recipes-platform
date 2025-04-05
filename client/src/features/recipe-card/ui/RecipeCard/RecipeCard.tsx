'use client';

import { foodImg } from '@/shared/assets';
import { memo, useEffect, useState } from 'react';
import { useUser } from '@/shared/hooks/useUser';
import { IFav } from '@/shared/model/fav';
import { favsService, TokenService } from '@/shared/api';
import { HeartButton } from '@/shared/ui/client';
import { useRouter } from 'next/navigation';
import { Route } from '@/shared/types';
import { ServingNumberInfo, TimeInfo } from '@/shared/ui/server';
import { EditButton } from './EditButton';

interface IRecipeCardProps {
  imageUrl: string;
  title: string;
  authorId: string | null;
  cookingTime: number;
  ingredients: string[];
  instructions: string;
  recipeId: string;
  createdAt: string;
  updatedAt: string;
  favsData?: IFav[];
  servingNum: number;
}

export const RecipeCard = memo(
  ({ recipeId, imageUrl, title, authorId, cookingTime, servingNum, favsData = [] }: IRecipeCardProps) => {
    const [isFave, setIsFave] = useState(false);
    const [favId, setFavId] = useState('');
    const [isHeartLoading, setIsHeartLoading] = useState(false);
    const { data, error, isLoading } = useUser(authorId);
    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

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
    }, [favsData, recipeId]);

    useEffect(() => {
      const currentUserId = TokenService.getUserId();
      if (currentUserId) {
        setUserId(currentUserId);
      }
    }, []);

    const handleHeartClick = async () => {
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
      }
    };

    const handleCardCLick = () => {
      router.push(`${Route.RECIPES}/${recipeId}`);
    };

    return (
      <div
        className='recipe-card flex flex-col flex-grow gap-2 w-64 max-w-80 h-full max-h-80 lg:min-w-52 lg:flex-grow-0 p-2 shadow-lg rounded-xl bg-white hover:cursor-pointer'
        onClick={handleCardCLick}
      >
        <div className='relative overflow-hidden flex justify-center items-center w-full h-44 rounded-xl group'>
          <img
            className='absolute object-cover w-full h-full hoverable:hover:scale-110 active:scale-110 hover:cursor-pointer transition-transform duration-500 ease-in-out'
            src={(imageUrl as string) ?? foodImg.src}
            alt='food image'
          />
        </div>
        <h4 className='font-semibold whitespace-nowrap overflow-hidden text-ellipsis hover:underline'>
          {title ?? 'Recipe Name'}
        </h4>

        <div className='flex justify-between items-center'>
          <div className='flex flex-col text-gray-400'>
            <span className='text-xs'>created by</span>
            <span className='text-sm'>{error || isLoading ? 'Unknown author' : data?.name}</span>
          </div>

          <HeartButton handleHeartClick={handleHeartClick} isFave={isFave} isHeartLoading={isHeartLoading} />
        </div>

        <div className='flex items-center gap-2 pt-2 mt-auto text-orange-400'>
          <TimeInfo time={cookingTime} />
          <span className='text-xs'>|</span>
          <ServingNumberInfo peopleNum={servingNum} />
          {userId && userId === authorId && <EditButton recipeId={recipeId} />}
        </div>
      </div>
    );
  },
);
