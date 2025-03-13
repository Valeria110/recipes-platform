export interface ICreateRecipeDto {
  authorId: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  cookingTime: number;
  preparationTime: number;
  imageUrl: string | null;
  servingNum: number;
  category: string[];
  cuisineType: string[];
}
