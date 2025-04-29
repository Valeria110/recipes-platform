export interface IRecipe {
  id: string;
  title: string;
  description: string;
  authorId: string | null;
  cookingTime: number;
  preparationTime: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string;
  servingNum: number;
  category: string[];
  cuisineType: string[];
}
