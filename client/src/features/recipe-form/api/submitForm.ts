import { TokenService, recipeService } from '@/shared/api';
import { transformInMin, ingredientsIntoStr } from '../helpers';
import { IRecipeForm } from '../model';
import { ICreateRecipeDto } from '@/shared/types';

export const submitForm = async (formData: IRecipeForm, updateRecipeId: string | null) => {
  const {
    recipeTitle: title,
    imageUrl,
    description,
    ingredients,
    foodCategory: category,
    cuisineType,
    cookingTime: { hours, minutes },
    preparationTime: { hours: prepHours, minutes: prepMin },
    servingNum,
    instructions,
  } = formData;
  const authorId = TokenService.getUserId();
  const cookingTime = transformInMin(hours, minutes);
  const preparationTime = transformInMin(prepHours, prepMin);
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

  if (updateRecipeId) {
    const res = await recipeService.updateRecipe(updateRecipeId, recipeData);
    if (res.success) {
      if (sessionStorage.getItem('formData')) sessionStorage.removeItem('formData');
    }
    return res;
  } else {
    const res = await recipeService.createRecipe(recipeData);

    if (res.success) {
      sessionStorage.removeItem('formData');
    }

    return res;
  }
};
