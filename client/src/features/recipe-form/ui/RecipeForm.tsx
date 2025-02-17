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

export const RecipeForm = () => {
  const methods = useForm<IRecipeForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: loadFormData() || formDefaultValues,
  });
  const { handleSubmit, control, getValues } = methods;
  const router = useRouter();

  function loadFormData() {
    const savedFormData = sessionStorage.getItem('formData');
    if (savedFormData) {
      const formData: IRecipeForm = JSON.parse(savedFormData);
      const imageBase64 = sessionStorage.getItem('imageBase64');
      if (imageBase64) {
        formData.image = imageBase64;
      }
      return JSON.parse(savedFormData);
    }
    return null;
  }

  const onFormSubmit: SubmitHandler<IRecipeForm> = (formData) => {
    console.log(formData);
    sessionStorage.removeItem('formData');
    sessionStorage.removeItem('imageBase64');
  };

  const showPreview = () => {
    const formData = getValues();
    const image = formData.image;
    if (image && image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result as string;
        sessionStorage.setItem('imageBase64', imageBase64);
      };
      reader.readAsDataURL(image);
    }
    sessionStorage.setItem('formData', JSON.stringify(formData));
    router.push(`share-recipe/preview?data=${encodeURIComponent(JSON.stringify(formData))}`);
  };

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
          name='image'
          control={control}
          render={({ field: { onChange, value } }) => <ImageUpload onChange={onChange} />}
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
};
