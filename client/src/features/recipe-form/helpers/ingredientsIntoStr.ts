import { IngredientType } from '@/features/recipe-form/model';

export const ingredientsIntoStr = (ingredients: IngredientType[]) => {
  return ingredients.map((ingredient) => `${ingredient.name} - ${ingredient.quantity} ${ingredient.units ?? ''}`);
};
