'use client';

import { RecipeCard } from '@/features/recipe-card';
import { IFav, IRecipe } from '@/shared/model';
import { useEffect } from 'react';

interface IProps {
  recipes: IRecipe[] | null;
  favsData: IFav[] | undefined;
}

export const Recipes = ({ recipes, favsData }: IProps) => {
  //   const { searchValue, filters } = useAppSelector((state) => state.search);
  //   const { categoriesQuery, cuisinesQuery } = filters;
  //   const { data, error, isLoading } = useSWR<IRecipeRes[]>(
  //     `recipe?category=${categoriesQuery}&cuisineType=${cuisinesQuery}`,
  //     () => recipeService.getRecipes(categoriesQuery, cuisinesQuery),
  //   );
  //   const { data: favsData, error: favsError, isLoading: isFavsLoading } = useSWR('favs', () => favsService.getFavs());
  //   const filteredRecipes = data?.filter((recipe) => recipe.title.toLowerCase().includes(searchValue));

  return (
    <div className='flex flex-col h-max sm:flex-row sm:flex-wrap gap-5 items-center sm:items-stretch'>
      {recipes &&
        recipes.map((recipe) => {
          const {
            imageUrl,
            title,
            authorId,
            ingredients,
            instructions,
            cookingTime,
            id,
            createdAt,
            updatedAt,
            servingNum,
          } = recipe;
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
              servingNum={servingNum}
            />
          );
        })}
    </div>
  );
};
