import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
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

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  ingredients: string[];

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
