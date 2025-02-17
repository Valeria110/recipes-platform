import { RecipePage } from '@/(pages)/recipe/ui/server';
import { IRecipeForm } from '@/features/recipe-form/model';
import { ingredientsIntoStr, transformInMin } from '../helpers';

export const PreviewPage = async ({ data }: { data: string }) => {
  if (data) {
    const formData: IRecipeForm = await JSON.parse(decodeURIComponent(data));
    const {
      recipeTitle: title,
      image: imageUrl,
      cookingTime: { hours, minutes, seconds },
      ingredients,
    } = formData;
    const nowDate = new Date().toDateString();
    const cookingTimeInMin = transformInMin(hours, minutes, seconds);

    return (
      <RecipePage
        recipeData={{
          ...formData,
          title,
          imageUrl,
          createdAt: nowDate,
          updatedAt: nowDate,
          cookingTime: cookingTimeInMin,
          ingredients: ingredientsIntoStr(ingredients),
        }}
      />
    );
  }
};
