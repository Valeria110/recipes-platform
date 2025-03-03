export interface IRecipeForm {
  recipeTitle: string;
  foodCategory: string[];
  cuisineType: string[];
  recipeDesc: string;
  preparationTime: ITime;
  cookingTime: ITime;
  servingNum: number;
  ingredients: IngredientType[];
  instructions: string;
  image: File | string;
  // video?: File;
}

interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

export type IngredientType = {
  name: string;
  quantity: number;
  units?: string;
};
