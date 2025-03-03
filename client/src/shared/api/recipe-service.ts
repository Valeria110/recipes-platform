import { BASE_URL } from '../config';
import { ICreateRecipeDto } from '../types';
import { TokenService } from './token-service';

export interface IRecipeRes {
  id: string;
  title: string;
  authorId: string | null;
  cookingTime: number;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null | File;
  ingredients: string[];
  instructions: string;
  servingNum: number;
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

  async createRecipe(recipeData: ICreateRecipeDto) {
    try {
      const res = await fetch(`${BASE_URL}/recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TokenService.accessToken}`,
        },
        body: JSON.stringify(recipeData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);

        return { success: false, data: null };
      }
      const data = await res.json();
      console.log('successful response:', data);

      return { success: true, data };
    } catch (err) {
      return { success: false, data: null };
    }
  }
}

export const recipeService = new RecipeService();
