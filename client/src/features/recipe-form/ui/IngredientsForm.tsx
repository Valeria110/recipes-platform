import { useFieldArray, useFormContext } from 'react-hook-form';
import { ingredientUnits, IRecipeForm } from '../model';
import { Button, NumberField } from '@/shared/ui/server';
import { Select, TextField } from '@/shared/ui/client';
import { useEffect } from 'react';
import { HiOutlineMinus } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';
import { useTranslations } from 'next-intl';

export const IngredientsForm = () => {
  const t = useTranslations('ShareRecipePage.RecipeForm.ingredients');
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
  }, [fields.length]);

  return (
    <section className='flex flex-col w-full gap-5 p-4 min-h-dvh bg-orange-200/50 rounded-2xl'>
      <h3 className='text-2xl font-semibold'>{t('title')}</h3>

      <div className='flex w-full gap-5 justify-between items-end'>
        <div className='flex w-full flex-col gap-12 lg:gap-10 items-center justify-between'>
          {fields.map((field, i) => {
            return (
              <div key={field.id} className='flex flex-col lg:flex-row gap-5 w-full items-start'>
                <TextField
                  label={t('ingredientName.label')}
                  placeholder={t('ingredientName.placeholder')}
                  register={register}
                  registerName={`ingredients.${i}.name`}
                  error={errors.ingredients?.[i]?.name}
                  width='w-full lg:w-3/5'
                />
                <div className='flex flex-col gap-2'>
                  <p>{t('quantity.label')}</p>
                  <NumberField
                    placeholder={t('quantity.label')}
                    registerName={`ingredients.${i}.quantity`}
                    register={register}
                    error={errors.ingredients?.[i]?.quantity}
                    defaultValue={0}
                    width='w-full lg:w-24'
                  />
                </div>
                <Select
                  label={t('units.label')}
                  registerName={`ingredients.${i}.units`}
                  control={control}
                  aria-placeholder={t('units.label')}
                  options={ingredientUnits}
                  error={errors?.ingredients?.[i]?.units && errors.ingredients[i].units.message}
                />
                <Button width='w-10' height='h-10' className='lg:mt-auto' onClick={() => remove(i)}>
                  <HiOutlineMinus size={25} />
                </Button>
              </div>
            );
          })}
        </div>
        <Button width='w-10' height='h-10' onClick={() => append({ name: '', quantity: 0, units: '' })}>
          <BsPlusLg size={25} />
        </Button>
      </div>
    </section>
  );
};
