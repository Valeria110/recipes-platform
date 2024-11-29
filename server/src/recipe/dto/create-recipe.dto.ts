import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  ingredients: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsInt()
  @IsNotEmpty()
  cookingTime: number;

  @ValidateIf(({ imageUrl }) => !!imageUrl)
  @IsString()
  imageUrl: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;
}
