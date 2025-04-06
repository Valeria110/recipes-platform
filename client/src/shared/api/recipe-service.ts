import { BASE_URL } from '../config';
import { IRecipe } from '../model';
import { ICreateRecipeDto } from '../types';
import { TokenService } from './token-service';

class RecipeService {
  async getRecipes(category: string = '', cuisineType: string = '', page: number = 1, limit: number = 10) {
    try {
      const res = await fetch(
        `${BASE_URL}/recipe?category=${category}&cuisineType=${cuisineType}&limit=${limit}&page=${page}`,
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw { errorMessage: errorData.message, status: res.status };
      }

      const data: { totalCount: number; recipes: IRecipe[] } = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getRecipeById(recipeId: string) {
    try {
      const res = await fetch(`${BASE_URL}/recipe/${recipeId}`);
      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, error: errorData.message, data: null };
      }

      const data: IRecipe = await res.json();
      return { success: true, error: null, data };
    } catch (err) {
      return { success: false, error: err, data: null };
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
        const error = await res.json();
        return { success: false, data: null, error };
      }

      const data = await res.json();
      return { success: true, data, error: null };
    } catch (err) {
      return { success: false, data: null, error: err };
    }
  }

  async updateRecipe(recipeId: string, recipeUpdateDto: Partial<ICreateRecipeDto>) {
    try {
      const res = await fetch(`${BASE_URL}/recipe/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TokenService.accessToken}`,
        },
        body: JSON.stringify(recipeUpdateDto),
      });

      if (!res.ok) {
        const error = await res.json();
        return { success: false, data: null, error };
      }

      const data = await res.json();
      return { success: true, data, error: null };
    } catch (err) {
      return { success: false, data: null, error: err };
    }
  }
}

export const recipeService = new RecipeService();
