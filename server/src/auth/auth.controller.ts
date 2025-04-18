import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UpdateUserDto } from './dto/updateAuthData.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() signupUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signup(signupUserDto);
    const { refreshToken } = await this.authService.login({
      email: signupUserDto.email,
      password: signupUserDto.password,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.cookie('isUserLoggedIn', 'true', {
      httpOnly: false,
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return user;
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, userId } =
      await this.authService.login(loginUserDto);

    res.cookie('refreshToken', refreshToken, {
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 неделя
    });

    res.cookie('isUserLoggedIn', 'true', {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { accessToken, refreshToken, userId };
  }

  @Post('refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, userId } =
      await this.authService.refresh(refreshTokenDto);
    res.cookie('refreshToken', refreshToken, {
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return { accessToken, refreshToken, userId };
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
