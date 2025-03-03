import { TokenService, recipeService } from '@/shared/api';
import { transformInMin, ingredientsIntoStr } from '../helpers';
import { IRecipeForm } from '../model';
import { ICreateRecipeDto } from '@/shared/types';

export const submitForm = async (formData: IRecipeForm) => {
  const {
    recipeTitle: title,
    image,
    recipeDesc: description,
    ingredients,
    foodCategory: category,
    cuisineType,
    cookingTime: { hours, minutes, seconds },
    preparationTime: { hours: prepHours, minutes: prepMin, seconds: prepSec },
    servingNum,
    instructions,
  } = formData;
  const authorId = TokenService.getUserId();
  const cookingTime = transformInMin(hours, minutes, seconds);
  const preparationTime = transformInMin(prepHours, prepMin, prepSec);
  let imageUrl = typeof image === 'string' ? image : (sessionStorage.getItem('imageBase64') ?? null);
  const recipeData: ICreateRecipeDto = {
    title,
    imageUrl,
    authorId,
    description,
    ingredients: ingredientsIntoStr(ingredients),
    cookingTime,
    preparationTime,
    category,
    cuisineType,
    instructions,
    servingNum,
  };

  const res = await recipeService.createRecipe(recipeData);

  if (res.success) {
    sessionStorage.removeItem('formData');
    sessionStorage.removeItem('imageBase64');
  }

  return res;
};
