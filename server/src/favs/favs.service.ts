import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { RecipeService } from 'src/recipe/recipe.service';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly recipeService: RecipeService,
    private readonly usersService: UserService,
  ) {}

  async create(createFavDto: CreateFavDto) {
    const user = await this.usersService.findOne(createFavDto.userId);
    const recipe = await this.recipeService.findOne(createFavDto.recipeId);
    if (user && recipe) {
      return await this.prismaService.favorite.create({ data: createFavDto });
    }
  }

  async findAll(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (user) {
      return await this.prismaService.user.findUnique({
        where: { id: userId },
        select: { favorites: true },
      });
    }
  }

  async remove(favId: string, userId: string) {
    const user = await this.usersService.findOne(userId);
    const favRecipe = await this.prismaService.favorite.findUnique({
      where: { id: favId, userId },
    });

    if (user && favRecipe) {
      return await this.prismaService.favorite.delete({ where: { id: favId } });
    }
  }
}
