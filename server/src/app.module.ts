import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { CommentModule } from './comment/comment.module';
import { FavsModule } from './favs/favs.module';
import { AuthModule } from './auth/auth.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    RecipeModule,
    CommentModule,
    FavsModule,
    AuthModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 3 * 6000, // 18 seconds
      max: 10,
    }),
    // CacheModule.registerAsync({
    //   useFactory: async () => {
    //     const store = await redisStore({
    //       socket: {
    //         host: 'localhost',
    //         port: 6379,
    //       },
    //     });

    //     return {
    //       store: store as unknown as CacheStore,
    //       ttl: 3 * 6000, // 18 seconds
    //       max: 10,
    //     };
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
