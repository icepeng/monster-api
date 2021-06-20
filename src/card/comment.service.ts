import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async createComment(createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.save({
      cardId: createCommentDto.cardId,
      content: createCommentDto.content,
    });

    return comment;
  }

  public async editComment(id: number, editCommentDto: EditCommentDto) {
    const comment = await this.commentRepository.findOne(id);
    comment.content = editCommentDto.content;
    await this.commentRepository.save(comment);

    return comment;
  }

  public async removeComment(id: number) {
    await this.commentRepository.delete(id);
  }
}
