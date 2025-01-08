import { BASE_URL } from '../config';
import { IUser } from '../model';
import { AuthService } from './auth-service';

class UsersService extends AuthService {
  constructor() {
    super();
  }

  async getAllUsers() {
    try {
      const res = await fetch(`${BASE_URL}/user`);
      if (!res.ok) {
        const errorData = await res.json();
        throw errorData.message;
      }

      const data: IUser = await res.json();
      return data;
    } catch (err) {
      return { errorMessage: err };
    }
  }

  async getUserById(id: string) {
    try {
      const res = await fetch(`${BASE_URL}/user/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw { errorMessage: errorData.message, status: res.status };
      }

      const data: IUser = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }
}

export const usersService = new UsersService();
