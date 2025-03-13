import { useFieldArray, useFormContext } from 'react-hook-form';
import { ingredientUnits, IRecipeForm } from '../model';
import { Button, NumberField, TextField } from '@/shared/ui/server';
import { Select } from '@/shared/ui/client';
import Image from 'next/image';
import { minusSvg, plusSvg } from '@/shared/assets';
import { useEffect } from 'react';

export const IngredientsForm = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<IRecipeForm>();
  const { fields, append, remove } = useFieldArray({ control, name: 'ingredients' });

  useEffect(() => {
    if (!fields.length) {
      append({ name: '', quantity: 0, units: '' });
    }
  }, []);

  return (
    <section className='flex flex-col w-full gap-5 p-4 min-h-dvh bg-orange-200/50 rounded-2xl'>
      <h3 className='text-2xl font-semibold'>Ingredients</h3>

      <div className='flex w-full gap-5 justify-between items-end'>
        <div className='flex w-full flex-col gap-12 lg:gap-10 items-center justify-between'>
          {fields.map((field, i) => {
            return (
              <div key={field.id} className='flex flex-col lg:flex-row gap-5 w-full items-start'>
                <TextField
                  label='Ingredient'
                  placeholder='Enter ingredient'
                  register={register}
                  registerName={`ingredients.${i}.name`}
                  error={errors.ingredients?.[i]?.name}
                  width='w-full lg:w-3/5'
                />
                <div className='flex flex-col gap-2'>
                  <p>Quantity</p>
                  <NumberField
                    placeholder='00'
                    registerName={`ingredients.${i}.quantity`}
                    register={register}
                    error={errors.ingredients?.[i]?.quantity}
                    width='w-full lg:w-24'
                  />
                </div>
                <Select
                  label='Units'
                  registerName={`ingredients.${i}.units`}
                  control={control}
                  aria-placeholder='Search for unit'
                  options={ingredientUnits}
                  error={errors?.ingredients?.[i]?.units && errors.ingredients[i].units.message}
                />
                <Button width='w-10' height='h-10' className='lg:mt-auto' onClick={() => remove(i)}>
                  <Image src={minusSvg} alt='minus svg image' width={25} height={25} />
                </Button>
              </div>
            );
          })}
        </div>
        <Button width='w-10' height='h-10' onClick={() => append({ name: '', quantity: 0, units: '' })}>
          <Image src={plusSvg} alt='plus svg image' width={25} height={25} />
        </Button>
      </div>
    </section>
  );
};
