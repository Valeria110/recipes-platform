import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { IRecipeFilters } from './types/recipe-filters.interface';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return await this.recipeService.create(createRecipeDto);
  }

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('cuisineType') cuisineType?: string,
    @Query('limit') limitStr?: string,
    @Query('page') pageStr?: string,
  ) {
    const filters: IRecipeFilters = {};
    if (category) {
      const categoriesArr = category.split(',');
      filters.category = { hasSome: categoriesArr };
    }
    if (cuisineType) {
      const cuisinesArr = cuisineType.split(',');
      filters.cuisineType = { hasSome: cuisinesArr };
    }

    const limit = limitStr ? parseInt(limitStr, 10) : 10;
    const page = pageStr ? parseInt(pageStr, 10) : 1;

    return this.recipeService.findAll(filters, limit, page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: Partial<UpdateRecipeDto>,
  ) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
