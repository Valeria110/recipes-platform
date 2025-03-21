'use client';

import { RecipeCard } from '@/features/recipe-card';
import { useAppSelector } from '@/shared/hooks';
import { IFav, IRecipe } from '@/shared/model';
import { useMemo } from 'react';

interface IProps {
  recipes: IRecipe[] | null;
  favsData: IFav[] | undefined;
}

export const Recipes = ({ recipes, favsData }: IProps) => {
  const { filters, searchValue } = useAppSelector((state) => state.search);
  const { categories, cuisineTypes } = filters;

  const filteredRecipes = useMemo(() => {
    return recipes?.filter((recipe) => {
      const matchesCategory = categories.length === 0 || recipe.category.some((item) => categories.includes(item));

      const matchesCuisine =
        cuisineTypes.length === 0 || recipe.cuisineType.some((item) => cuisineTypes.includes(item));
      const matchesSearchValue = searchValue === '' || recipe.title.toLowerCase().includes(searchValue.toLowerCase());
      return matchesCategory && matchesCuisine && matchesSearchValue;
    });
  }, [recipes, categories, cuisineTypes, searchValue]);

  return (
    <div className='flex flex-col h-max sm:flex-row sm:flex-wrap gap-5 items-center sm:items-stretch'>
      {!filteredRecipes?.length && <p className='mt-10 ml-auto mr-auto'>No results match &#128577;</p>}
      {filteredRecipes &&
        filteredRecipes.map((recipe) => {
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
