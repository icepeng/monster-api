import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label';
import { LabelService } from './label.service';

@Controller('labels')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  public async create(@Body() createLabelDto: CreateLabelDto) {
    const card = await this.labelService.create(createLabelDto);

    return { card };
  }

  @Delete('/:id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    await this.labelService.remove(id);

    return { id };
  }
}
