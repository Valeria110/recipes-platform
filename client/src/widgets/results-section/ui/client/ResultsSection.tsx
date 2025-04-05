'use client';

import { useAppSelector } from '@/shared/hooks/store.hooks';
import useSWR from 'swr';
import { favsService } from '@/shared/api/favs-service';
import { recipeService } from '@/shared/api';
import { RecipeCard } from '@/features/recipe-card/ui/RecipeCard/RecipeCard';
import { Loader } from '@/shared/ui/server';
import { IRecipe } from '@/shared/model';
import { useEffect, useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

export const ResultsSection = () => {
  const { searchValue, filters } = useAppSelector((state) => state.search);
  const { categoriesQuery, cuisinesQuery } = filters;

  const { data: favsData, error: favsError, isLoading: isFavsLoading } = useSWR('favs', () => favsService.getFavs());

  const getKey = (page: number, prevPageData: { recipes: IRecipe[]; totalCount: number }) => {
    if (prevPageData && !prevPageData.recipes.length) return null;
    return `recipe?category=${categoriesQuery}&cuisineType=${cuisinesQuery}&limit=10&page=${page + 1}`;
  };

  const { data, error, isLoading, size, setSize, isValidating } = useSWRInfinite(getKey, (key) => {
    const url = new URLSearchParams(key.split('?')[1]);
    const category = url.get('category') || '';
    const cuisineType = url.get('cuisineType') || '';
    const page = parseInt(url.get('page') || '1');
    const limit = parseInt(url.get('limit') || '10');

    return recipeService.getRecipes(category, cuisineType, page, limit);
  });

  const allRecipes = data?.map((page) => page.recipes).flat() || [];
  const totalCount = data?.[0].totalCount || 0;

  const filteredRecipes = useMemo(
    () => allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(searchValue)),
    [allRecipes, searchValue],
  );

  useEffect(() => {
    const scrollHandler = () => {
      const documentElement = document.documentElement;

      if (
        documentElement.scrollHeight - (documentElement.scrollTop + window.innerHeight) < 300 &&
        allRecipes.length &&
        allRecipes.length < totalCount &&
        !isValidating
      ) {
        setSize(size + 1);
      }
    };

    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, [allRecipes.length, totalCount, isValidating, size]);

  if (error || favsError) return <div className='mt-10'>Data fetching error &#128577;</div>;
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
        {filteredRecipes.length &&
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
    </section>
  );
};
