import { IFav } from './fav';
import { IRecipe } from './recipe';

export interface IUser {
  id: string;
  name: string;
  email: string;
  recipes: IRecipe[];
  favorites: IFav[];
}

export interface IUserUpdateDto {
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}
