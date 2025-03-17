import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { accessTokenConfig, refreshTokenConfig } from './jwt-config/jwt.config';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UpdateUserDto } from './dto/updateAuthData.dto';
import { UpdateUserData } from './entities/update-user';

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

  async update(id: string, updatePasswordDto: UpdateUserDto) {
    const user = await this.userService.findOne(id);

    if (user) {
      const { newPassword, oldPassword, name, email } = updatePasswordDto;

      if (oldPassword && user.password !== updatePasswordDto.oldPassword) {
        const isPasswordCorrect = await this.isPasswordMatch(
          oldPassword,
          user.password,
        );

        if (!isPasswordCorrect) {
          throw new BadRequestException('Incorrect old password');
        }
        if (!newPassword) {
          throw new BadRequestException('New password is not provided');
        }
      }
      if (newPassword && !oldPassword) {
        throw new BadRequestException('Incorrect old password');
      }

      const newData: UpdateUserData = {};
      if (newPassword) newData.password = await this.hashPassword(newPassword);
      if (name) newData.name = name;
      if (email) newData.email = email;

      return await this.prismaService.user.update({
        where: { id },
        data: newData,
      });
    }
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async isPasswordMatch(plainPassword: string, hashedPassword: string) {
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
