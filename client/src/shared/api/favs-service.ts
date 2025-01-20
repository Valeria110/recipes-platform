import { BASE_URL } from '../config';
import { IFav } from '../model';
import { TokenService } from './token-service';

class FavsService {
  async addFav(recipeId: string) {
    try {
      const res = await this.fetchWithAuth(`${BASE_URL}/favs/${TokenService.getUserId()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId, userId: TokenService.getUserId() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData.message;
      }

      const data: IFav = await res.json();
      return data;
    } catch (err) {
      throw { errorMessage: `${err}` };
    }
  }

  async removeFav(favId: string) {
    try {
      const res = await this.fetchWithAuth(`${BASE_URL}/favs/${favId}/${TokenService.getUserId()}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { errorMessage: errorData.message, status: res.status };
      }
      return { success: true };
    } catch (err) {
      throw { errorMessage: `${err}` };
    }
  }

  async getFavs() {
    try {
      if (!TokenService.getUserId()) {
        return [];
      }

      const res = await this.fetchWithAuth(`${BASE_URL}/favs/${TokenService.getUserId()}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw { errorMessage: errorData.message, status: res.status };
      }

      const data: { favorites: IFav[] } = await res.json();
      return data.favorites;
    } catch (err) {
      // return { errorMessage: err };
      throw err;
    }
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    options.headers = { ...options.headers, Authorization: `Bearer ${TokenService.getAccessToken()}` };
    let res = await fetch(url, options);

    if (res.status === 401) {
      const refreshTokenRes = await TokenService.refreshToken();
      if (refreshTokenRes.errorMessage) {
        throw new Error('Unable to refresh token: ' + refreshTokenRes.errorMessage);
      }

      options.headers = { ...options.headers, Authorization: `Bearer ${TokenService.getAccessToken()}` };
      res = await fetch(url, options);
    }

    return res;
  }
}

export const favsService = new FavsService();
