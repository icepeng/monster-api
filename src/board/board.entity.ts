import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Label } from '../card/label.entity';
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

  @OneToMany(
    () => Label,
    label => label.board,
  )
  labels: Label[];
}
