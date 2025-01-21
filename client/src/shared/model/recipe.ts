export interface IRecipe {
  recipeId: string;
  title: string;
  authorId: string | null;
  cookingTime: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  ingredients: string[];
  instructions: string;
}
