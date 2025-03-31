export interface IRecipeForm {
  recipeTitle: string;
  foodCategory: string[];
  cuisineType: string[];
  description: string;
  preparationTime: ITime;
  cookingTime: ITime;
  servingNum: number;
  ingredients: IngredientType[];
  instructions: string;
  imageUrl: string;
  // video?: File;
}

interface ITime {
  hours: number;
  minutes: number;
}

export type IngredientType = {
  name: string;
  quantity?: number;
  units?: string;
};
