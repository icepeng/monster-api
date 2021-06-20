import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  public async create(createBoardDto: CreateBoardDto) {
    const list = await this.boardRepository.save({
      title: createBoardDto.title,
    });

    return list;
  }

  async findAll() {
    return this.boardRepository.find();
  }

  async findOne(id: number) {
    const data = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.lists', 'list')
      .leftJoinAndSelect('list.cards', 'card')
      .leftJoinAndSelect('card.comments', 'comment')
      .leftJoinAndSelect('card.labels', 'label')
      .where('board.id = :id', { id })
      .getOne();

    if (!data) {
      throw new NotFoundException();
    }

    const board = {
      id: data.id,
      title: data.title,
    };

    const lists = data.lists.map(x => ({
      id: x.id,
      boardId: x.boardId,
      index: x.index,
      title: x.title,
    }));

    const cardData = data.lists
      .map(x => x.cards)
      .reduce((arr, x) => [...arr, ...x], []);

    const cards = cardData.map(x => ({
      id: x.id,
      listId: x.listId,
      index: x.index,
      title: x.title,
      description: x.description,
      due: x.due,
      dueComplete: x.dueComplete,
    }));

    const comments = cardData
      .map(x => x.comments)
      .reduce((arr, x) => [...arr, ...x], []);

    const labels = cardData
      .map(x => x.labels)
      .reduce((arr, x) => [...arr, ...x], []);

    const cardLabels = cardData
      .map(x => x.labels.map(l => ({ cardId: x.id, labelId: l.id })))
      .reduce((arr, x) => [...arr, ...x], []);

    return {
      board,
      lists,
      cards,
      labels,
      cardLabels,
      comments,
    };
  }

  public async remove(id: number) {
    await this.boardRepository.delete(id);
  }
}
