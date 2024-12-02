import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/services/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule, UserModule],
})
export class AuthModule {}
