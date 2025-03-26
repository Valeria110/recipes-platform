import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UpdateUserDto } from './dto/updateAuthData.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupUserDto: CreateUserDto) {
    return await this.authService.signup(signupUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refresh(refreshTokenDto);
  }

  @UseGuards(AuthGuard)
  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.authService.update(userId, updateUserDto);
    return plainToClass(User, user);
  }
}
