import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/services/prisma.service';
import { RecipeService } from 'src/recipe/recipe.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly recipeService: RecipeService,
    private readonly usersService: UserService,
  ) {}
  async create(recipeId: string, createCommentDto: CreateCommentDto) {
    const recipe = await this.recipeService.findOne(recipeId);
    const user = await this.usersService.findOne(createCommentDto.userId);
    if (recipe && user) {
      return await this.prismaService.comment.create({
        data: { ...createCommentDto, recipeId },
      });
    }
  }

  async findAll(recipeId: string) {
    const recipe = await this.recipeService.findOne(recipeId);
    if (recipe) {
      return await this.prismaService.recipe.findUnique({
        where: { id: recipeId },
        select: { comments: true },
      });
    }
  }

  async removeAllComments(recipeId: string) {
    const recipe = await this.recipeService.findOne(recipeId);
    if (recipe) {
      return await this.prismaService.comment.deleteMany({
        where: { recipeId },
      });
    }
  }
}
