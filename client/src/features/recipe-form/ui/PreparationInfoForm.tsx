'use client';

import { useFormContext } from 'react-hook-form';
import { IRecipeForm } from '../model';
import { NumberField } from '@/shared/ui/server';
import { useTranslations } from 'next-intl';

export const PreparationInfoForm = () => {
  const t = useTranslations('ShareRecipePage.RecipeForm.PrepAndServingInfo');
  const {
    register,
    formState: { errors },
  } = useFormContext<IRecipeForm>();

  return (
    <div className='flex flex-col gap-4 w-full md:w-1/2 p-5'>
      <h3 className='text-2xl font-semibold'>{t('title')}</h3>
      <div className='flex flex-col gap-2'>
        <h4>{t('prepTimeTitle')}</h4>
        <div className='flex flex-wrap gap-5 w-full'>
          <NumberField
            register={register}
            registerName='preparationTime.hours'
            label={t('hours.label')}
            placeholder={t('hours.placeholder')}
            error={errors.preparationTime?.hours}
          />
          <NumberField
            register={register}
            registerName='preparationTime.minutes'
            label={t('minutes.label')}
            placeholder={t('minutes.label')}
            max={59}
            error={errors.preparationTime?.minutes}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h4>{t('cookingTimeTitle')}</h4>
        <div className='flex flex-wrap gap-5 w-full'>
          <NumberField
            register={register}
            registerName='cookingTime.hours'
            label={t('hours.label')}
            placeholder={t('hours.placeholder')}
            error={errors.cookingTime?.hours}
          />
          <NumberField
            register={register}
            registerName='cookingTime.minutes'
            label={t('minutes.label')}
            placeholder={t('minutes.label')}
            max={59}
            error={errors.cookingTime?.minutes}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h4>{t('servingNum.title')}</h4>
        <NumberField
          register={register}
          registerName='servingNum'
          label={t('servingNum.label')}
          placeholder={t('servingNum.placeholder')}
          max={100}
          error={errors.servingNum}
        />
      </div>
    </div>
  );
};
