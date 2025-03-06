import { RecipePage } from '@/(pages)/recipe/ui/server';
import { IRecipeForm } from '@/features/recipe-form/model';
import { ingredientsIntoStr, transformInMin } from '@/features/recipe-form/helpers';

export const PreviewPage = async ({ data }: { data: string }) => {
  if (data) {
    const formData: IRecipeForm = await JSON.parse(decodeURIComponent(data));
    const {
      recipeTitle: title,
      cookingTime: { hours, minutes, seconds },
      preparationTime: { hours: prepHours, minutes: prepMin, seconds: prepSec },
      ingredients,
    } = formData;
    const nowDate = new Date().toDateString();
    const cookingTimeInMin = transformInMin(hours, minutes, seconds);
    const prepTimeInMin = transformInMin(prepHours, prepMin, prepSec);

    return (
      <RecipePage
        recipeData={{
          ...formData,
          title,
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
