import { IngredientType } from '@/features/recipe-form/model';

export const ingredientsIntoStr = (ingredients: IngredientType[]) => {
  console.log(ingredients);

  return ingredients.map(
    (ingredient) =>
      `${ingredient.name} ${ingredient.quantity || ingredient.units ? `- ${ingredient.quantity ?? ''}` : ''} ${ingredient.units ?? ''}`,
  );
};
