'use client';

import { Controller, useFormContext } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css';
import { IRecipeForm } from '../model';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import { toolbarOptions } from '../model';
import { useTranslations } from 'next-intl';

export const InstructionsForm = () => {
  const t = useTranslations('ShareRecipePage.RecipeForm.instructions');
  const {
    control,
    formState: { errors },
  } = useFormContext<IRecipeForm>();
  return (
    <section className='flex flex-col gap-5'>
      <h3 className='text-2xl font-semibold'>{t('title')}</h3>
      <p className='text-gray-500'>{t('subtitle')}</p>
      <Controller
        control={control}
        name='instructions'
        render={({ field }) => {
          return (
            <>
              <ReactQuill
                {...field}
                theme='snow'
                placeholder={t('placeholder')}
                modules={{ toolbar: toolbarOptions }}
              />
              {errors.instructions && <p className='text-red-500 text-sm'>{errors.instructions.message}</p>}
            </>
          );
        }}
      />
    </section>
  );
};
