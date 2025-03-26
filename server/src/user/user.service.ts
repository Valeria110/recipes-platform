import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';
import { validate as uuidValidate } from 'uuid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
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

    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        recipes: true,
        favorites: {
          select: { id: true, userId: true, recipeId: true, recipe: true },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      return await this.prismaService.user.delete({ where: { id } });
    }
  }

  private async getCachedData<T>(key: string, fetchDataFunc: () => Promise<T>) {
    const cachedData = await this.cacheManager.get<T>(key);

    if (cachedData) {
      return cachedData;
    }

    const value = await fetchDataFunc();
    await this.cacheManager.set(key, value);
    return value;
  }
}
