'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { RecipeDetailsForm } from './RecipeDetailsForm';
import { formDefaultValues, IRecipeForm, schema } from '../model';
import { PreparationInfoForm } from './PreparationInfoForm';
import { IngredientsForm } from './IngredientsForm';
import { InstructionsForm } from './InstructionsForm';
import { ImageUpload } from './ImageUpload';
import { Button } from '@/shared/ui/server';
import { useRouter } from 'next/navigation';
import { submitForm } from '../api';
import { Route } from '@/shared/types';
import { useCallback, useEffect, useState } from 'react';
import { TokenService } from '@/shared/api';

export const RecipeForm = () => {
  const [formData, setFormData] = useState<IRecipeForm>(formDefaultValues);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const methods = useForm<IRecipeForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: formData,
  });
  const { handleSubmit, control, getValues, reset } = methods;
  const router = useRouter();

  useEffect(() => {
    const accessToken = TokenService.getAccessToken();

    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      router.replace(Route.LOGIN);
    }
  }, []);

  useEffect(() => {
    const savedFormData = sessionStorage.getItem('formData');

    if (savedFormData) {
      const parsedData: IRecipeForm = JSON.parse(savedFormData);
      setFormData(parsedData);
      reset(parsedData);
    } else {
      setFormData(formDefaultValues);
    }
  }, [reset]);

  const onFormSubmit: SubmitHandler<IRecipeForm> = async (formData) => {
    const res = await submitForm(formData);
    if (res.success) {
      router.replace(`${Route.RECIPES}`);
      reset(formDefaultValues);
    }
  };

  const showPreview = useCallback(() => {
    const recipeFormData = getValues();
    sessionStorage.setItem('formData', JSON.stringify(recipeFormData));
    setFormData(recipeFormData);
    router.push(`share-recipe/preview?data=${encodeURIComponent(JSON.stringify(recipeFormData))}`);
  }, [getValues, router]);

  if (isLoggedIn) {
    return (
      <FormProvider {...methods}>
        <form className='flex flex-col gap-10' action='' onSubmit={handleSubmit(onFormSubmit)}>
          <div className='flex flex-col md:flex-row gap-10 sm:gap-20 w-full'>
            <RecipeDetailsForm />
            <PreparationInfoForm />
          </div>
          <IngredientsForm />
          <InstructionsForm />
          <div className='flex justify-center items-center w-full p-5 bg-orange-200/50 h-80 rounded-2xl'>
            <h2 className='text-center sm:text-2xl text-xl lg:text-3xl font-semibold text-orange-950'>
              Deepen user engagement with your recipe
            </h2>
          </div>
          <Controller
            name='imageUrl'
            control={control}
            render={({ field: { onChange } }) => <ImageUpload onChange={onChange} />}
          />

          <div className='flex gap-5 justify-between w-full'>
            <Button onClick={showPreview} type='button' width='w-1/2' buttonGroup='outlined'>
              Preview
            </Button>
            <Button type='submit' width='w-1/2'>
              Share recipe
            </Button>
          </div>
        </form>
      </FormProvider>
    );
  }
};
