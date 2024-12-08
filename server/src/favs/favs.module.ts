import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { UserModule } from 'src/user/user.module';
import { RecipeModule } from 'src/recipe/recipe.module';
import { PrismaModule } from 'src/services/prisma.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [UserModule, RecipeModule, PrismaModule],
})
export class FavsModule {}
