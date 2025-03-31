import { RecipePage } from '@/(pages)/recipe/ui/server';
import { IRecipeForm } from '@/features/recipe-form/model';
import { ingredientsIntoStr, transformInMin } from '@/features/recipe-form/helpers';

export const PreviewPage = async ({ data }: { data: string }) => {
  if (data) {
    const formData: IRecipeForm = await JSON.parse(decodeURIComponent(data));
    const {
      recipeTitle: title,
      cookingTime: { hours, minutes },
      preparationTime: { hours: prepHours, minutes: prepMin },
      ingredients,
      foodCategory,
    } = formData;
    const nowDate = new Date().toDateString();
    const cookingTimeInMin = transformInMin(hours, minutes);
    const prepTimeInMin = transformInMin(prepHours, prepMin);

    return (
      <RecipePage
        recipeData={{
          ...formData,
          title,
          category: foodCategory,
          createdAt: nowDate,
          updatedAt: nowDate,
          cookingTime: cookingTimeInMin,
          preparationTime: prepTimeInMin,
          ingredients: ingredientsIntoStr(ingredients),
        }}
      />
    );
  }
};
