import { RecipePage } from '@/(pages)/recipe/ui/server';
import { recipeService } from '@/shared/api';

export async function generateStaticParams() {
  const recipes = await recipeService.getRecipes();
  return recipes.map((recipe) => ({ recipeId: recipe.id }));
}

export default async function Page({ params }: { params: Promise<{ recipeId: string }> }) {
  const recipeId = (await params).recipeId;
  const recipeData = await recipeService.getRecipeById(recipeId);
  if ('id' in recipeData) {
    return <RecipePage recipeData={recipeData} />;
  } else {
    return <p>Fetching error :(</p>;
  }
}
