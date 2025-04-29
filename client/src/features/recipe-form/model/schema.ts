import { setYupLocale } from '@/shared/config';
import { object } from 'yup';
import * as yup from 'yup';

export const getRecipeFormSchema = (locale: string) => {
  setYupLocale(locale);

  return object({
    // Block "Recipe Details"
    recipeTitle: yup.string().required().min(3),
    foodCategory: yup.array().of(yup.string().required()).min(1).required(),
    cuisineType: yup.array().of(yup.string().required()).min(1).required(),
    description: yup.string().min(50).max(1500).required(),

    // Block "Preparation and Serving Information"
    preparationTime: yup
      .object({
        hours: yup
          .number()
          .typeError('Quantity must be a number')
          .required('Preparation time is required')
          .min(0)
          .max(23),
        minutes: yup
          .number()
          .typeError('Quantity must be a number')
          .required('Preparation time is required')
          .min(0)
          .max(59),
      })
      .required(),
    cookingTime: yup
      .object({
        hours: yup.number().typeError('Quantity must be a number').required('Cooking time is required').min(0).max(23),
        minutes: yup
          .number()
          .typeError('Quantity must be a number')
          .required('Cooking time is required')
          .min(0)
          .max(59),
      })
      .required(),
    servingNum: yup.number().required().min(1).max(100),

    // Block ingredients
    ingredients: yup
      .array()
      .of(
        yup
          .object({
            name: yup.string().required('Ingredient name is required'),
            quantity: yup
              .mixed<string | number>()
              .transform((_, originalValue) =>
                originalValue === '' || originalValue === undefined ? undefined : Number(originalValue),
              )
              .test(
                'is-number',
                'Quantity must be a number',
                (value) => value === undefined || typeof value === 'number',
              )
              .test(
                'is-positive-or-zero',
                'Quantity must be more or equal to 0',
                (value) => value === undefined || (typeof value === 'number' && value >= 0),
              ),
            units: yup.string(),
          })
          .required(),
      )
      .min(1)
      .required(),

    // Block instructions
    instructions: yup.string().required('Instructions are required').min(50),

    // image
    imageUrl: yup.string().required('Image is required'),

    // video
    // video: yup.mixed<File>().test('fileSize', 'The size of the file should not exceed 20Mb', (value) => {
    //   if (!value) return true;
    //   return (value as File).size <= 200 * 1024 * 1024;
    // }),
  });
};
