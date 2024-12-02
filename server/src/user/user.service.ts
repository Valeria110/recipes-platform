import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/services/prisma.service';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    if (!(await this.isUserExist(createUserDto.email))) {
      const user = await this.prismaService.user.create({
        data: createUserDto,
      });
      return plainToClass(User, user);
    }
  }

  private async isUserExist(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (user) {
      throw new BadRequestException('User with this email already exists');
    }
    return false;
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('User id should be provided');
    }

    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }

    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    if (user) {
      if (user.password !== updatePasswordDto.oldPassword) {
        throw new BadRequestException('Incorrect old password');
      }

      return await this.prismaService.user.update({
        where: { id },
        data: { password: updatePasswordDto.newPassword },
      });
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      return this.prismaService.user.delete({ where: { id } });
    }
  }
}
