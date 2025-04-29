import { AUTH_BASE_URL } from '../config';
import { deleteCookie } from '../helpers';

export class TokenService {
  static accessToken: string = '';

  static getAccessToken() {
    return this.accessToken;
  }

  static storeAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  static async refreshToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      deleteCookie('isUserLoggedIn');
      this.removeUserId();
      return { success: false, errorMessage: 'No refresh token available' };
    }

    try {
      const res = await fetch(`${AUTH_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        deleteCookie('isUserLoggedIn');
        const error = await res.json();
        this.removeUserId();
        return { success: false, errorMessage: error.message, statusCode: error.statusCode };
      }

      const { accessToken, refreshToken: newRefreshToken } = await res.json();
      this.storeAccessToken(accessToken);
      return { accessToken, newRefreshToken, success: true };
    } catch (err) {
      return { success: false, errorMessage: err };
    }
  }

  static getRefreshToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      if (cookie.trim().startsWith('refreshToken=')) {
        return cookie.split('=')[1];
      }
    }

    return null;
  }

  static getUserId() {
    return localStorage.getItem('userId') || '';
  }

  static storeUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  static removeUserId() {
    localStorage.removeItem('userId');
  }
}
