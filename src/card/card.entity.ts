import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from '../list/list.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createTime: string;

  @Column() listId: string;

  @ManyToOne(
    () => List,
    list => list.cards,
  )
  @JoinColumn({ name: 'listId' })
  list: List;

  @Column('int')
  index: number;

  @Column('text') title: string;

  @Column('text') description: string;

  @Column('timestamp') due: string | null;

  @Column() dueComplete: boolean;
}
