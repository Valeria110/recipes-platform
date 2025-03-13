import { BASE_URL } from '../config';

export class TokenService {
  static accessToken: string = '';

  static getAccessToken() {
    return this.accessToken;
  }

  static storeAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    document.cookie = `isUserLoggedIn=${true};`;
  }

  static async refreshToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      document.cookie = 'isUserLoggedIn=; max-age=-1';
      this.removeUserId();
      return { success: false, errorMessage: 'No refresh token available' };
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        document.cookie = 'isUserLoggedIn=; max-age=-1';
        const error = await res.json();
        this.removeUserId();
        return { success: false, errorMessage: error.message, statusCode: error.statusCode };
      }

      const { accessToken, refreshToken: newRefreshToken } = await res.json();
      this.storeAccessToken(accessToken);
      this.storeRefreshToken(newRefreshToken);
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

  static storeRefreshToken(refreshToken: string) {
    document.cookie = `refreshToken=${refreshToken};`;
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
