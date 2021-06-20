import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../card/card.entity';
import { ListController } from './list.controller';
import { List } from './list.entity';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card, List])],
  providers: [ListService],
  controllers: [ListController],
})
export class ListModule {}
