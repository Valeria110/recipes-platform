import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from 'src/services/prisma.service';
import { validate as uuidValidate } from 'uuid';
import { UserService } from 'src/user/user.service';
import { IRecipeFilters } from './types/recipe-filters.interface';

@Injectable()
export class RecipeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    await this.userService.findOne(createRecipeDto.authorId);

    return await this.prismaService.recipe.create({
      data: createRecipeDto,
    });
  }

  async findAll(filters: IRecipeFilters) {
    if (!filters.category && !filters.cuisineType) {
      return await this.prismaService.recipe.findMany();
    }

    return await this.prismaService.recipe.findMany({
      where: {
        AND: [
          filters.category ? { category: filters.category } : {},
          filters.cuisineType ? { cuisineType: filters.cuisineType } : {},
        ],
      },
    });
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('Recipe id should be provided');
    }

    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid recipe id');
    }

    const recipe = await this.prismaService.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe with this id does not exist');
    }

    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.findOne(id);

    if (recipe) {
      if (updateRecipeDto.authorId) {
        await this.userService.findOne(updateRecipeDto.authorId);
      }

      return this.prismaService.recipe.update({
        where: { id },
        data: updateRecipeDto,
      });
    }
  }

  async remove(id: string) {
    const recipe = await this.findOne(id);
    if (recipe) {
      return await this.prismaService.recipe.delete({ where: { id } });
    }
  }
}
