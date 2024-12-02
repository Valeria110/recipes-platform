import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaModule } from 'src/services/prisma.module';
import { RecipeModule } from 'src/recipe/recipe.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [PrismaModule, RecipeModule, UserModule],
})
export class CommentModule {}
