import { List } from 'src/list/list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('increment') id: number;

  @CreateDateColumn() createTime: string;

  @Column() listId: number;

  @ManyToOne(
    () => List,
    list => list.cards,
  )
  @JoinColumn({ name: 'listId' })
  list: List;

  @Column() title: string;

  @Column() color: string;
}
