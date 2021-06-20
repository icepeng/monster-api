import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
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
    const card = await this.commentService.createComment(createCommentDto);

    return { card };
  }

  @Put(':id')
  public async editComment(
    @Param('id') id: string,
    @Body() editCommentDto: EditCommentDto,
  ) {
    const comment = await this.commentService.editComment(id, editCommentDto);

    return { comment };
  }

  @Delete()
  public async removeComment(@Param('id') id: string) {
    await this.commentService.removeComment(id);

    return { id };
  }
}
