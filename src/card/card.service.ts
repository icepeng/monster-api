import { moveItemIndex, transferArrayItem } from '@icepeng/monster-lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { AddLabelDto } from './dto/add-label.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { EditDescriptionDto } from './dto/edit-description.dto';
import { EditTitleDto } from './dto/edit-title.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { SetDueCompleteDto } from './dto/set-due-complete.dto';
import { SetDueDto } from './dto/set-due.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
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

  public async editTitle(id: number, editTitleDto: EditTitleDto) {
    const card = await this.cardRepository.findOne(id);
    card.title = editTitleDto.title;
    await this.cardRepository.save(card);

    return card;
  }

  public async editDescription(
    id: number,
    editDescriptionDto: EditDescriptionDto,
  ) {
    const card = await this.cardRepository.findOne(id);
    card.description = editDescriptionDto.description;
    await this.cardRepository.save(card);

    return card;
  }

  public async setDue(
    id: number,
    setDueDto: SetDueDto,
  ) {
    const card = await this.cardRepository.findOne(id);
    card.due = setDueDto.due;
    await this.cardRepository.save(card);

    return card;
  }

  public async setDueComplete(
    id: number,
    setDueCompleteDto: SetDueCompleteDto,
  ) {
    const card = await this.cardRepository.findOne(id);
    card.dueComplete = setDueCompleteDto.dueComplete;
    await this.cardRepository.save(card);

    return card;
  }

  public async remove(id: number) {
    await this.cardRepository.delete(id);
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

  public async addLabel(id: number, addLabelDto: AddLabelDto) {
    await this.cardRepository
      .createQueryBuilder()
      .relation('labels')
      .of(id)
      .add(addLabelDto.labelId);

    return { id, labelId: addLabelDto.labelId };
  }

  public async dropLabel(id: number, labelId: number) {
    await this.cardRepository
      .createQueryBuilder()
      .relation('labels')
      .of(id)
      .remove(labelId);

    return { id, labelId };
  }
}
