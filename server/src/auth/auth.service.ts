import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { accessTokenConfig, refreshTokenConfig } from './jwt-config/jwt.config';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(signupUserDto.password);
    return await this.userService.create({
      ...signupUserDto,
      password: hashedPassword,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (user) {
      const isPasswordMatch = await this.isPasswordMatch(
        loginUserDto.password,
        user.password,
      );
      if (isPasswordMatch) {
        return await this.generateToken(loginUserDto.email, user.id);
      } else {
        throw new ForbiddenException('Incorrect password');
      }
    } else {
      throw new ForbiddenException('User with this email does not exist');
    }
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const { userId } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        refreshTokenConfig,
      );
      const user = await this.userService.findOne(userId);
      return await this.generateToken(user.email, userId);
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  private async isPasswordMatch(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  private async generateToken(email: string, userId: string) {
    const payload = { email, userId };
    const [{ accessToken }, { refreshToken }] = await Promise.all([
      {
        accessToken: await this.jwtService.signAsync(
          payload,
          accessTokenConfig,
        ),
      },
      {
        refreshToken: await this.jwtService.signAsync(
          payload,
          refreshTokenConfig,
        ),
      },
    ]);
    return { accessToken, refreshToken, userId };
  }
}
