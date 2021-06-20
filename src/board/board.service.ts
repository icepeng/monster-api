import { Injectable } from '@nestjs/common';
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

  async findOne(id: string) {
    return this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.lists', 'list')
      .leftJoinAndSelect('list.cards', 'card')
      .leftJoinAndSelect('card.comments', 'comment')
      .where('board.id = :id', { id })
      .getOne();
  }

  public async remove(id: string) {
    await this.boardRepository.delete(id);
  }
}
