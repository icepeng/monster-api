import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { List } from '../list/list.entity';
import { Comment } from './comment.entity';

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

  @OneToMany(
    () => Comment,
    comment => comment.card,
  )
  comments: Comment[];

  @Column('int')
  index: number;

  @Column('text') title: string;

  @Column('text') description: string;

  @Column('timestamp', { nullable: true }) due: string | null;

  @Column() dueComplete: boolean;
}
