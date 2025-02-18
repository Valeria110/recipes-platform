'use client';

import { Controller, useFormContext } from 'react-hook-form';
import 'react-quill-new/dist/quill.snow.css';
import { IRecipeForm } from '../model';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import { toolbarOptions } from '../model';

export const InstructionsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IRecipeForm>();
  return (
    <section className='flex flex-col gap-5'>
      <h3 className='text-2xl font-semibold'>Instructions</h3>
      <p className='text-gray-500'>
        To unlock the full flavor and perfect your culinary masterpiece, it&apos;s crucial to meticulously detail every
        step of the recipe!
      </p>
      <Controller
        control={control}
        name='instructions'
        render={({ field }) => {
          return (
            <>
              <ReactQuill
                {...field}
                theme='snow'
                placeholder='Write here your instructions for the recipe...'
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
