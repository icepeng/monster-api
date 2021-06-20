import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { LabelController } from './label.controller';
import { Label } from './label.entity';
import { LabelService } from './label.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Comment, Label])],
  providers: [CardService, CommentService, LabelService],
  controllers: [CardController, CommentController, LabelController],
})
export class CardModule {}
