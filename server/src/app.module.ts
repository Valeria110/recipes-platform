import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { CommentModule } from './comment/comment.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [UserModule, RecipeModule, CommentModule, FavsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
