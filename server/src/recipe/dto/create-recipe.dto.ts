import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
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

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  category: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  cuisineType: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsInt()
  @IsNotEmpty()
  cookingTime: number;

  @IsInt()
  @IsNotEmpty()
  preparationTime: number;

  @ValidateIf(({ imageUrl }) => !!imageUrl)
  @IsString()
  imageUrl: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  @IsNumber()
  servingNum: number;
}
