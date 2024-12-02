import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
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
        // generate token
      } else {
        throw new ForbiddenException('Incorrect password');
      }
    } else {
      throw new ForbiddenException('User with this email does not exist');
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
}
