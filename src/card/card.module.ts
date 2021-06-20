import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { Comment } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Comment])],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
