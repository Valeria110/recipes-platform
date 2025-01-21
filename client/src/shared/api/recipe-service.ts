import { BASE_URL } from '../config';

export interface IRecipeRes {
  id: string;
  title: string;
  authorId: string | null;
  cookingTime: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  ingredients: string[];
  instructions: string;
}

class RecipeService {
  async getRecipes(category: string = '', cuisineType: string = '') {
    try {
      const res = await fetch(`${BASE_URL}/recipe?category=${category}&cuisineType=${cuisineType}`);

      if (!res.ok) {
        const errorData = await res.json();
        throw { errorMessage: errorData.message, status: res.status };
      }

      const recipes: IRecipeRes[] = await res.json();
      return recipes;
    } catch (err) {
      throw err;
    }
  }

  async getRecipeById(recipeId: string) {
    try {
      const res = await fetch(`${BASE_URL}/recipe/${recipeId}`);
      if (!res.ok) {
        const errorData = await res.json();
        return { errorMessage: errorData.message, status: res.status };
      }

      const data: IRecipeRes = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export const recipeService = new RecipeService();
