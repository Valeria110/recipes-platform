import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { PrismaModule } from 'src/services/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: [PrismaModule, UserModule],
})
export class RecipeModule {}
