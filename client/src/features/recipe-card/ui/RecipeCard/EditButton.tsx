'use client';

import { IRecipeForm } from '@/features/recipe-form/model';
import { recipeService } from '@/shared/api';
import { MouseEvent } from 'react';
import { FaEdit } from 'react-icons/fa';
import { transformTime } from '../../helpers';
import { transformIngredients } from '../../helpers/transformIngredients';
import { useRouter } from 'next/navigation';
import { Route } from '@/shared/types';
import useSWR from 'swr';

interface IProps {
  recipeId: string;
}

export const EditButton = ({ recipeId }: IProps) => {
  const router = useRouter();
  const { data: res } = useSWR(recipeId, () => recipeService.getRecipeById(recipeId));

  const handleClick = async (e: MouseEvent) => {
    e.stopPropagation();

    if (res?.success && res.data) {
      const {
        id,
        title,
        category,
        cuisineType,
        description,
        servingNum,
        ingredients,
        instructions,
        cookingTime,
        preparationTime,
        imageUrl,
      } = res.data;
      console.log(cookingTime, preparationTime);

      const formData: IRecipeForm = {
        recipeTitle: title,
        description,
        foodCategory: category,
        cuisineType,
        cookingTime: transformTime(cookingTime),
        preparationTime: transformTime(preparationTime),
        ingredients: ingredients.map((ingredient) => transformIngredients(ingredient)),
        instructions,
        servingNum,
        imageUrl,
      };

      sessionStorage.setItem('formData', JSON.stringify(formData));
      router.push(`${Route.SHARE_RECIPE}?updateRecipeId=${id}`);
    }
  };

  return (
    <button className='p-2 group/button ml-auto' onClick={(e) => handleClick(e)}>
      <FaEdit
        size={20}
        className='text-gray-300 hoverable:group-hover/button:text-gray-400 transition-colors duration-300 ease-in-out'
      />
    </button>
  );
};
