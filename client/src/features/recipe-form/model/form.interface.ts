export interface IRecipeForm {
  recipeTitle: string;
  foodCategory: string[];
  cuisineType: string[];
  recipeDesc: string;
  preparationTime: ITime;
  cookingTime: ITime;
  servingNumber: number;
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

type IngredientType = {
  name: string;
  quantity: number;
  units: string;
};
