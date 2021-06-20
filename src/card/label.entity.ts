import { List } from 'src/list/list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createTime: string;

  @Column() listId: string;

  @ManyToOne(
    () => List,
    list => list.cards,
  )
  @JoinColumn({ name: 'listId' })
  list: List;

  @Column() title: string;

  @Column() color: string;
}
