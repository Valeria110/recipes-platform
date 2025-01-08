import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post(':userId')
  async create(
    @Param('userId') userId: string,
    @Body() createFavDto: CreateFavDto,
  ) {
    return await this.favsService.create(createFavDto, userId);
  }

  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    return await this.favsService.findAll(userId);
  }

  @HttpCode(204)
  @Delete(':favId/:userId')
  async remove(@Param('favId') favId: string, @Param('userId') userId: string) {
    return await this.favsService.remove(favId, userId);
  }
}
