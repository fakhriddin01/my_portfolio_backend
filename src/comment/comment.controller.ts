import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateCommentStatusDto } from './dto/update-comment-status.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get('false')
  findAllFalse() {
    return this.commentService.findAllFalse();
  }

  @Get('/post/:post_id')
  findAllForPost(@Param('post_id') post_id: string) {
    return this.commentService.findAllForPost(+post_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Patch('/status/:id')
  updateStatus(@Param('id') id: string, @Body() updateCommentStatusDto: UpdateCommentStatusDto) {
    return this.commentService.updateStatus(+id, updateCommentStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
