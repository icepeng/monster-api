import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  public async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const comment = await this.commentService.createComment(createCommentDto);

    return { comment };
  }

  @Put(':id')
  public async editComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() editCommentDto: EditCommentDto,
  ) {
    const comment = await this.commentService.editComment(id, editCommentDto);

    return { comment };
  }

  @Delete(':id')
  public async removeComment(@Param('id', ParseIntPipe) id: number) {
    await this.commentService.removeComment(id);

    return { id };
  }
}
