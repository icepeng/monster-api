import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';
import { Card } from '../card/card.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createTime: string;

  @Column() boardId: string;

  @ManyToOne(
    () => Board,
    board => board.lists,
  )
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @OneToMany(
    () => Card,
    card => card.list,
  )
  cards: Card[];

  @Column('int')
  index: number;

  @Column('text') title: string;
}
