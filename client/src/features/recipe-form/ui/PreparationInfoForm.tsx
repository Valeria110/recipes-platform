'use client';

import { useFormContext } from 'react-hook-form';
import { IRecipeForm } from '../model';
import { NumberField } from '@/shared/ui/server';

export const PreparationInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IRecipeForm>();

  return (
    <div className='flex flex-col gap-4 w-full md:w-1/2 p-5'>
      <h3 className='text-2xl font-semibold'>Preparation and Serving Information</h3>
      <div className='flex flex-col gap-2'>
        <h4>Preparation time</h4>
        <div className='flex flex-wrap gap-5 w-full'>
          <NumberField
            register={register}
            registerName='preparationTime.hours'
            label=':hour(s)'
            placeholder='00'
            error={errors.preparationTime?.hours}
          />
          <NumberField
            register={register}
            registerName='preparationTime.minutes'
            label=':minute(s)'
            placeholder='00'
            max={59}
            error={errors.preparationTime?.minutes}
          />
          <NumberField
            register={register}
            registerName='preparationTime.seconds'
            label=':second(s)'
            placeholder='00'
            max={59}
            error={errors.preparationTime?.seconds}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h4>Cooking time</h4>
        <div className='flex flex-wrap gap-5 w-full'>
          <NumberField
            register={register}
            registerName='cookingTime.hours'
            label=':hour(s)'
            placeholder='00'
            error={errors.cookingTime?.hours}
          />
          <NumberField
            register={register}
            registerName='cookingTime.minutes'
            label=':minute(s)'
            placeholder='00'
            max={59}
            error={errors.cookingTime?.minutes}
          />
          <NumberField
            register={register}
            registerName='cookingTime.seconds'
            label=':second(s)'
            placeholder='00'
            max={59}
            error={errors.cookingTime?.seconds}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h4>Serving number</h4>
        <NumberField
          register={register}
          registerName='servingNumber'
          label='Enter serving number'
          placeholder='0'
          max={100}
          error={errors.servingNumber}
        />
      </div>
    </div>
  );
};
