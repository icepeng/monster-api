import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Card } from '../card/card.entity';
import { List } from './list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { EditTitleDto } from './dto/edit-title.dto';
import { MoveListDto } from './dto/move-list.dto';
import { moveItemIndex } from '@icepeng/monster-lib';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  public async create(createListDto: CreateListDto) {
    const list = await this.listRepository.save({
      boardId: createListDto.boardId,
      title: createListDto.title,
      index: createListDto.index,
    });

    return list;
  }

  public async editTitle(id: string, editTitleDto: EditTitleDto) {
    const list = await this.listRepository.findOne(id);
    list.title = editTitleDto.title;
    await this.listRepository.save(list);

    return list;
  }

  public async moveList(moveListDto: MoveListDto) {
    const list = await this.listRepository.findOne({
      index: moveListDto.currentIndex,
    });
    let lists = await this.listRepository.find({
      boardId: list.boardId,
    });

    lists = moveItemIndex(
      lists,
      moveListDto.previousIndex,
      moveListDto.currentIndex,
    );

    await this.listRepository.save(lists);

    return lists;
  }

  public async remove(id: string) {
    const cardsInList = await this.cardRepository.find({ listId: id });
    const cardIds = cardsInList.map(card => card.id);
    const list = await this.listRepository.findOne(id);
    await this.entityManager.remove([...cardsInList, list]);

    return cardIds;
  }
}
