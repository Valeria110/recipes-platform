'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { RecipeDetailsForm } from './RecipeDetailsForm';
import { formDefaultValues, IRecipeForm, getRecipeFormSchema } from '../model';
import { PreparationInfoForm } from './PreparationInfoForm';
import { IngredientsForm } from './IngredientsForm';
import { InstructionsForm } from './InstructionsForm';
import { ImageUpload } from './ImageUpload';
import { Button } from '@/shared/ui/server';
import { submitForm } from '../api';
import { Route } from '@/shared/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TokenService } from '@/shared/api';
import { toast, ToastContainer } from 'react-toastify';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/shared/config/i18n/navigation';

export const RecipeForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const searchParams = useSearchParams();
  const updateRecipeId = searchParams.get('updateRecipeId');
  const locale = useLocale();
  const t = useTranslations('ShareRecipePage');

  const defaultValues = useMemo(() => {
    const savedFormData = sessionStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : formDefaultValues;
  }, []);
  const schema = getRecipeFormSchema(locale);

  const methods = useForm<IRecipeForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { isSubmitting },
  } = methods;
  const router = useRouter();

  useEffect(() => {
    const accessToken = TokenService.getAccessToken();

    if (!accessToken) {
      setIsLoggedIn(false);
      router.replace(Route.LOGIN);
    }
  }, []);

  const onFormSubmit: SubmitHandler<IRecipeForm> = async (formData) => {
    const res = await submitForm(formData, updateRecipeId);

    if (res.success) {
      router.replace(`${Route.RECIPES}`);
      reset(formDefaultValues);
      toast.success(
        `${updateRecipeId ? 'Your recipe was successfully updated!' : 'New recipe was successfully published'}`,
      );
    }
    if (res.error) {
      toast.error(`Something went wrong: ${res.error}`);
    }
  };

  const showPreview = useCallback(() => {
    const recipeFormData = getValues();
    sessionStorage.setItem('formData', JSON.stringify(recipeFormData));
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
              {t('RecipeForm.DeepenEngagement')}
            </h2>
          </div>
          <Controller
            name='imageUrl'
            control={control}
            render={({ field: { onChange } }) => <ImageUpload onChange={onChange} />}
          />

          <div className='flex flex-col sm:flex-row gap-5 items-center justify-between w-full'>
            <Button onClick={showPreview} type='button' width='w-2/3 sm:w-1/2' buttonGroup='outlined'>
              {t('RecipeForm.PreviewBtn')}
            </Button>
            <Button type='submit' width='w-2/3 sm:w-1/2' disabled={isSubmitting}>
              {t('RecipeForm.ShareRecipeBtn')}
            </Button>
          </div>
        </form>

        <ToastContainer />
      </FormProvider>
    );
  }
};
