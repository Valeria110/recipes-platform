import { object } from 'yup';
import * as yup from 'yup';

export const schema = object({
  // Block "Recipe Details"
  recipeTitle: yup
    .string()
    .required('Title must be at least 3 characters long')
    .min(3, 'Title must be at least 3 characters long'),
  foodCategory: yup
    .array()
    .of(yup.string().required())
    .min(1, 'At least one food category must be selected')
    .required(),
  cuisineType: yup.array().of(yup.string().required()).min(1, 'At least one cuisine type must be selected').required(),
  recipeDesc: yup
    .string()
    .min(50, 'Small description is required')
    .max(500, 'Description must not exceed 200 characters')
    .required(),

  // Block "Preparation and Serving Information"
  preparationTime: yup
    .object({
      hours: yup
        .number()
        .required('Preparation time is required')
        .min(0, 'Hours cannot be negative')
        .max(23, 'Hours cannot exceed 23'),
      minutes: yup
        .number()
        .required('Preparation time is required')
        .min(0, 'Minutes cannot be negative')
        .max(59, 'Minutes cannot exceed 59'),
      seconds: yup
        .number()
        .required('Preparation time is required')
        .min(0, 'Seconds cannot be negative')
        .max(59, 'Seconds cannot exceed 59'),
    })
    .required(),
  cookingTime: yup
    .object({
      hours: yup
        .number()
        .required('Cooking time is required')
        .min(0, 'Hours cannot be negative')
        .max(23, 'Hours cannot exceed 23'),
      minutes: yup
        .number()
        .required('Cooking time is required')
        .min(0, 'Minutes cannot be negative')
        .max(59, 'Minutes cannot exceed 59'),
      seconds: yup
        .number()
        .required('Cooking time is required')
        .min(0, 'Seconds cannot be negative')
        .max(59, 'Seconds cannot exceed 59'),
    })
    .required(),
  servingNum: yup
    .number()
    .required('Serving number is required')
    .min(1, 'At least 1 serving is required')
    .max(100, 'Serving number cannot exceed 100'),

  // Block ingredients
  ingredients: yup
    .array()
    .of(
      yup
        .object({
          name: yup.string().required('Ingredient name is required'),
          quantity: yup
            .number()
            .typeError('Quantity must be a number')
            .positive('Quantity must be positive')
            .required('Quantity is required')
            .min(0.1, 'Quantity must be more than 0'),
          units: yup.string(),
        })
        .required(),
    )
    .min(1, 'At least one ingredient is required')
    .required(),

  // Block instructions
  instructions: yup
    .string()
    .required('Instructions are required')
    .min(50, 'Instructions must be at least 50 characters long'),

  // image
  image: yup
    .mixed<File | string>()
    .test(
      'required',
      'Image is required',
      (value) => value instanceof File || (typeof value === 'string' && value !== ''),
    )
    .test('fileSize', 'The size of the file should not exceed 5Mb', (value) => {
      if (!value) return false;
      if (typeof value === 'string') return true;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .required('Image is required'),

  // video
  // video: yup.mixed<File>().test('fileSize', 'The size of the file should not exceed 20Mb', (value) => {
  //   if (!value) return true;
  //   return (value as File).size <= 200 * 1024 * 1024;
  // }),
});
