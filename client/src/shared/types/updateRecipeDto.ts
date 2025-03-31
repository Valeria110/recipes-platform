import { ICreateRecipeDto } from './createRecipeDto';

export interface IUpdateRecipeDto extends Partial<ICreateRecipeDto> {}
