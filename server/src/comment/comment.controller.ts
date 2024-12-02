import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('recipe/:id/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') id: string,
  ) {
    return await this.commentService.create(id, createCommentDto);
  }

  @Get()
  async findAll(@Param('id') id: string) {
    return await this.commentService.findAll(id);
  }

  @HttpCode(204)
  @Delete()
  async remove(@Param('id') id: string) {
    return await this.commentService.removeAllComments(id);
  }
}
