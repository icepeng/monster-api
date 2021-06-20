import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../board/board.entity';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('increment') id: number;

  @CreateDateColumn() createTime: string;

  @Column() boardId: number;

  @ManyToOne(
    () => Board,
    board => board.labels,
  )
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column() title: string;

  @Column() color: string;
}
