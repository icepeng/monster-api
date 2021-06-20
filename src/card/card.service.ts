import { moveItemIndex, transferArrayItem } from '@icepeng/monster-lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { Comment } from './comment.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';
import { EditDescriptionDto } from './dto/edit-description.dto';
import { EditTitleDto } from './dto/edit-title.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { SetDueCompleteDto } from './dto/set-due.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async create(createCardDto: CreateCardDto) {
    const card = await this.cardRepository.save({
      listId: createCardDto.listId,
      title: createCardDto.title,
      description: '',
      index: createCardDto.index,
      due: null,
      dueComplete: false,
    });

    return card;
  }

  public async editTitle(id: string, editTitleDto: EditTitleDto) {
    const card = await this.cardRepository.findOne(id);
    card.title = editTitleDto.title;
    await this.cardRepository.save(card);

    return card;
  }

  public async editDescription(
    id: string,
    editDescriptionDto: EditDescriptionDto,
  ) {
    const card = await this.cardRepository.findOne(id);
    card.description = editDescriptionDto.description;
    await this.cardRepository.save(card);

    return card;
  }

  public async setDueComplete(
    id: string,
    setDueCompleteDto: SetDueCompleteDto,
  ) {
    const card = await this.cardRepository.findOne(id);
    card.dueComplete = setDueCompleteDto.dueComplete;
    await this.cardRepository.save(card);

    return card;
  }

  public async remove(id: string) {
    await this.cardRepository.delete(id);
  }

  public async createComment(id: string, createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.save({
      cardId: id,
      content: createCommentDto.content,
    });

    return comment;
  }

  public async editComment(id: string, editCommentDto: EditCommentDto) {
    const comment = await this.commentRepository.findOne(id);
    comment.content = editCommentDto.content;
    await this.commentRepository.save(comment);

    return comment;
  }

  public async removeComment(id: string) {
    await this.commentRepository.delete(id);
  }

  public async moveCard(moveCardDto: MoveCardDto) {
    const {
      currentIndex,
      currentListId,
      previousIndex,
      previousListId,
    } = moveCardDto;
    const currentCards = await this.cardRepository.find({
      where: [
        {
          listId: currentListId,
        },
        {
          listId: previousListId,
        },
      ],
    });
    if (previousListId === currentListId) {
      const cards = moveItemIndex(currentCards, previousIndex, currentIndex);
      return this.cardRepository.save(cards);
    } else {
      const cards = transferArrayItem(
        currentCards.filter(x => x.listId === previousListId),
        currentCards.filter(x => x.listId === currentListId),
        previousIndex,
        currentIndex,
        currentListId,
      );
      return this.cardRepository.save(cards);
    }
  }
}
