'use client';

import { useAppSelector } from '@/shared/hooks/store.hooks';
import useSWR from 'swr';
import { favsService } from '@/shared/api/favs-service';
import { RecipeCard } from '@/features/recipe-card/ui/RecipeCard/RecipeCard';
import { Loader, ScrollLoader } from '@/shared/ui/server';
import { useMemo } from 'react';
import { useInfiniteScroll, usePaginatedRecipes } from '@/shared/hooks';

export const ResultsSection = () => {
  const { searchValue, filters } = useAppSelector((state) => state.search);
  const { categoriesQuery, cuisinesQuery } = filters;

  const { data: favsData, error: favsError, isLoading: isFavsLoading } = useSWR('favs', () => favsService.getFavs());
  const { data, error, isLoading, size, setSize, isValidating } = usePaginatedRecipes(categoriesQuery, cuisinesQuery);

  const allRecipes = useMemo(() => data?.map((page) => page.recipes).flat() || [], [data]);
  const totalCount = data?.[0].totalCount || 0;

  const filteredRecipes = useMemo(
    () => allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(searchValue)),
    [allRecipes, searchValue],
  );

  useInfiniteScroll({
    hasMore: allRecipes.length < totalCount,
    isLoading: isValidating,
    onLoadMore: () => setSize(size + 1),
  });

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
        {isValidating && allRecipes.length < totalCount && (
          <div className='flex items-center justify-center w-64 max-w-80 sm:h-80 max-h-80 lg:min-w-52 lg:flex-grow-0 p-2'>
            <ScrollLoader />
          </div>
        )}
      </div>
    </section>
  );
};
