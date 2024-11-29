import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return await this.recipeService.create(createRecipeDto);
  }

  @Get()
  async findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: Partial<UpdateRecipeDto>,
  ) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recipeService.remove(id);
  }
}
