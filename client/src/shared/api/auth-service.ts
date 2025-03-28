import { BASE_URL } from '../config';
import { IUserUpdateDto } from '../model';
import { TokenService } from './token-service';

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface IErrorInfo {
  errorMessage: string;
  status: number;
}

export class AuthService {
  async login(email: string, password: string): Promise<ILoginRes | IErrorInfo | string> {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        document.cookie = 'isUserLoggedIn=; max-age=-1';
        throw { errorMessage: errorData.message, status: res.status };
      }

      const { accessToken, refreshToken, userId }: ILoginRes = await res.json();
      TokenService.storeAccessToken(accessToken);
      TokenService.storeRefreshToken(refreshToken);
      TokenService.storeUserId(userId);
      document.cookie = `isUserLoggedIn=${true};`;

      return { accessToken, refreshToken, userId };
    } catch (err) {
      return JSON.stringify(err);
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
        document.cookie = 'isUserLoggedIn=; max-age=-1';
        throw { errorMessage: errorData.message, status: res.status };
      }

      const data = await res.json();
      TokenService.storeUserId(data.id);
      return await this.login(email, password);
    } catch (err) {
      return JSON.stringify(err);
    }
  }

  logout() {
    TokenService.accessToken = '';
    TokenService.removeUserId();
    document.cookie = 'refreshToken=; max-age=-1';
    document.cookie = 'isUserLoggedIn=; max-age=-1';
  }

  async refreshToken() {
    return TokenService.refreshToken();
  }

  async updateUserAuthData(updateUserDto: IUserUpdateDto) {
    try {
      const userId = TokenService.getUserId();
      const res = await fetch(`${BASE_URL}/auth/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TokenService.accessToken}`,
        },
        body: JSON.stringify(updateUserDto),
      });
      if (!res.ok) {
        const errorData = await res.json();
        return { success: false, data: null, error: errorData.message };
      }

      const data = await res.json();
      return { success: true, data, error: null };
    } catch (err) {
      return { success: false, data: null, error: err };
    }
  }
}

export const authService = new AuthService();
