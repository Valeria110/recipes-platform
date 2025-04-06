import useSWRInfinite from 'swr/infinite';
import { IRecipe } from '../model';
import { recipeService } from '../api';

export const usePaginatedRecipes = (categoriesQuery: string, cuisinesQuery: string) => {
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

  return { data, error, isLoading, size, setSize, isValidating };
};
