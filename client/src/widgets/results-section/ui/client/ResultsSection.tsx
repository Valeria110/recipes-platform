'use client';

import { useAppSelector } from '@/shared/hooks/store.hooks';
import useSWR from 'swr';
import { favsService } from '@/shared/api/favs-service';
import { IRecipeRes, recipeService } from '@/shared/api';
import { RecipeCard } from '@/features/recipe-card/ui/RecipeCard/RecipeCard';
import { Loader } from '@/shared/ui/server';

export const ResultsSection = () => {
  const { searchValue, filters } = useAppSelector((state) => state.search);
  const { categoriesQuery, cuisinesQuery } = filters;
  const { data, error, isLoading } = useSWR<IRecipeRes[]>(
    `recipe?category=${categoriesQuery}&cuisineType=${cuisinesQuery}`,
    () => recipeService.getRecipes(categoriesQuery, cuisinesQuery),
  );
  const { data: favsData, error: favsError, isLoading: isFavsLoading } = useSWR('favs', () => favsService.getFavs());

  const filteredRecipes = data?.filter((recipe) => recipe.title.toLowerCase().includes(searchValue));

  if (error || favsError) return <div className='mt-10'>Data fetching error :(</div>;
  console.log('isLoading', isLoading, 'error', error);
  if (isLoading || isFavsLoading)
    return (
      <div className='mt-10'>
        <Loader />
      </div>
    );
  if (!filteredRecipes?.length) return <p className='mt-10'>No results match</p>;

  return (
    <section className='mt-10'>
      <h4 className='font-semibold'>Based on your search</h4>
      <div className='flex flex-col  sm:flex-row sm:flex-wrap gap-5 items-center sm:items-stretch'>
        {filteredRecipes.map((recipe) => {
          const { imageUrl, title, authorId, ingredients, instructions, cookingTime, id, createdAt, updatedAt } =
            recipe;
          return (
            <RecipeCard
              recipeId={id}
              key={id}
              imageUrl={imageUrl}
              title={title}
              authorId={authorId}
              cookingTime={cookingTime}
              ingredients={ingredients}
              instructions={instructions}
              createdAt={createdAt}
              updatedAt={updatedAt}
              favsData={favsData}
            />
          );
        })}
      </div>
    </section>
  );
};
