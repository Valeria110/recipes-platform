import { BASE_URL } from '../config';

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
      return { errorMessage: 'No refresh token available' };
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        throw new Error('Failed to refresh token');
      }

      const { accessToken, refreshToken: newRefreshToken } = await res.json();
      this.storeAccessToken(accessToken);
      this.storeRefreshToken(newRefreshToken);
      return { accessToken };
    } catch (err) {
      return { errorMessage: err };
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
