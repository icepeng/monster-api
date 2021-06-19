import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { EditDescriptionDto } from './dto/edit-description.dto';
import { EditTitleDto } from './dto/edit-title.dto';
import { SetDueCompleteDto } from './dto/set-due.dto';

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
}
