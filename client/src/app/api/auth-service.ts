const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class AuthService {
  constructor(private accessToken: string = '') {}

  async login(email: string, password: string) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const { accessToken, refreshToken, userId } = await res.json();
        console.log('login data: ', { accessToken, refreshToken, userId });
        this.storeAccessToken(accessToken);
        this.storeRefreshToken(refreshToken);

        return { accessToken, refreshToken, userId };
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  logout() {
    this.accessToken = '';
    document.cookie = 'refreshToken=; max-age=-1';
  }

  async refreshToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
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
      return accessToken;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  private storeAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  private storeRefreshToken(refreshToken: string) {
    document.cookie = `refreshToken=${refreshToken};`;
  }

  private getAccessToken() {
    return this.accessToken;
  }

  private getRefreshToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      if (cookie.startsWith('refreshToken=')) {
        return cookie.split('=')[1];
      }
    }

    return null;
  }
}

export const authService = new AuthService();
