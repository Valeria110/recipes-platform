import { Prisma } from '@prisma/client';

export interface IRecipeFilters {
  category?: RecipeFilter;
  cuisineType?: RecipeFilter;
  // category?: string;
  // cuisineType?: string;
}

type RecipeFilter = {
  in: string[];
  mode?: Prisma.QueryMode;
};
