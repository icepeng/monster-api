import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment') id: number;

  @CreateDateColumn() createTime: string;

  @Column() cardId: number;

  @ManyToOne(
    () => Card,
    card => card.comments,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'cardId' })
  card: Card;

  @Column('text') content: string;
}
