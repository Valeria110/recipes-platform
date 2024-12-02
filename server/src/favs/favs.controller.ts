import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post()
  async create(@Body() createFavDto: CreateFavDto) {
    return await this.favsService.create(createFavDto);
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
