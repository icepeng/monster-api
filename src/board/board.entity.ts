import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from '../list/list.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('increment') id: number;

  @CreateDateColumn() createTime: string;

  @Column('text') title: string;

  @OneToMany(
    () => List,
    list => list.board,
  )
  lists: List[];
}
