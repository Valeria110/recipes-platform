export interface IRecipeFilters {
  category?: RecipeFilter;
  cuisineType?: RecipeFilter;
}

type RecipeFilter = {
  hasSome: string[];
};
