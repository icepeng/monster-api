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
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createTime: string;

  @Column() cardId: string;

  @ManyToOne(
    () => Card,
    card => card.comments,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'cardId' })
  card: Card;

  @Column('text') content: string;
}
