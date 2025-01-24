import { Prisma } from '@prisma/client';

export interface IRecipeFilters {
  category?: RecipeFilter;
  cuisineType?: RecipeFilter;
}

type RecipeFilter = {
  in: string[];
  mode?: 'insensitive';
};
