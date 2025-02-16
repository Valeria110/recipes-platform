'use client';

import { Textarea, TextField } from '@/shared/ui/server';
import { useFormContext } from 'react-hook-form';
import { Select } from '@/shared/ui/client';
import { cuisineTypes, foodCategories } from '@/shared/model';
import { IRecipeForm } from '../model';

export const RecipeDetailsForm = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<IRecipeForm>();

  return (
    <div className='flex flex-col gap-4 w-full md:w-1/2 p-5'>
      <h3 className='text-2xl font-semibold'>Recipe Details</h3>
      <TextField
        label='Recipe title'
        width='w-full'
        registerName='recipeTitle'
        register={register}
        placeholder='Enter recipe title'
        error={errors.recipeTitle}
      />
      <Select<IRecipeForm>
        control={control}
        isMultiSelect={true}
        registerName='foodCategory'
        label='Food Category'
        options={foodCategories}
        aria-placeholder='Search food category'
        error={errors.foodCategory && errors.foodCategory.message}
      />
      <Select<IRecipeForm>
        control={control}
        isMultiSelect={true}
        registerName='cuisineType'
        label='Cuisine type'
        options={cuisineTypes}
        aria-placeholder='Search cuisine type'
        error={errors.cuisineType && errors.cuisineType.message}
      />

      <Textarea
        register={register}
        label='Small description'
        registerName='recipeDesc'
        error={errors.recipeDesc}
        placeholder='Enter a small description'
      />
    </div>
  );
};
