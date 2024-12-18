const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class AuthService {
  constructor(
    private accessToken: string = '',
    private userId: string = '',
  ) {}

  async login(email: string, password: string) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw errorData.message;
      }

      const { accessToken, refreshToken, userId } = await res.json();
      console.log('tokens data: ', { accessToken, refreshToken, userId });
      this.storeAccessToken(accessToken);
      this.storeRefreshToken(refreshToken);

      return { accessToken, refreshToken, userId };
    } catch (err) {
      return { errorMessage: err };
    }
  }

  async signup(name: string, email: string, password: string) {
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData.message;
      }

      const data = await res.json();
      this.userId = data.id;
      return await this.login(email, password);
    } catch (err) {
      return { errorMessage: err };
    }
  }

  logout() {
    this.accessToken = '';
    this.userId = '';
    document.cookie = 'refreshToken=; max-age=-1';
  }

  async refreshToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      // console.error('No refresh token available');
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
      if (cookie.trim().startsWith('refreshToken=')) {
        return cookie.split('=')[1];
      }
    }

    return null;
  }
}

export const authService = new AuthService();
