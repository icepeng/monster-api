import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label';
import { Label } from './label.entity';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  public async create(createLabelDto: CreateLabelDto) {
    const card = await this.labelRepository.save({
      listId: createLabelDto.listId,
      title: createLabelDto.title,
      color: createLabelDto.color,
    });

    return card;
  }

  public async remove(id: number) {
    await this.labelRepository.delete(id);
  }
}
