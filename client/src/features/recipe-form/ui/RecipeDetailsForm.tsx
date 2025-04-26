'use client';

import { Textarea } from '@/shared/ui/server';
import { useFormContext } from 'react-hook-form';
import { Select, TextField } from '@/shared/ui/client';
import { cuisineTypes, foodCategories } from '@/shared/model';
import { IRecipeForm } from '../model';
import { useTranslations } from 'next-intl';

export const RecipeDetailsForm = () => {
  const t = useTranslations('ShareRecipePage.RecipeForm');
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<IRecipeForm>();

  return (
    <div className='flex flex-col gap-4 w-full md:w-1/2 p-5'>
      <h3 className='text-2xl font-semibold'>{t('RecipeDetails')}</h3>
      <TextField
        label={t('RecipeTitle.label')}
        width='w-full'
        registerName='recipeTitle'
        register={register}
        placeholder={t('RecipeTitle.placeholder')}
        error={errors.recipeTitle}
      />
      <Select<IRecipeForm>
        control={control}
        isMultiSelect={true}
        registerName='foodCategory'
        label={t('FoodCategory.label')}
        options={foodCategories}
        aria-placeholder={t('FoodCategory.label')}
        error={errors.foodCategory && errors.foodCategory.message}
      />
      <Select<IRecipeForm>
        control={control}
        isMultiSelect={true}
        registerName='cuisineType'
        label={t('CuisineType.label')}
        options={cuisineTypes}
        aria-placeholder={t('CuisineType.label')}
        error={errors.cuisineType && errors.cuisineType.message}
      />

      <Textarea
        register={register}
        label={t('SmallDesc.label')}
        registerName='description'
        error={errors.description}
        placeholder={t('SmallDesc.label')}
      />
    </div>
  );
};
