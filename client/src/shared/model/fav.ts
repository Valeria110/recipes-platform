import { IRecipe } from './recipe';

export interface IFav {
  id: string;
  recipeId: string;
  userId: string;
  recipe: IRecipe;
}
