import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFavDto {
  @IsNotEmpty()
  @IsUUID()
  recipeId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
