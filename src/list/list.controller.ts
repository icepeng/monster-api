import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { EditTitleDto } from './dto/edit-title.dto';
import { MoveListDto } from './dto/move-list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  public async create(@Body() createListDto: CreateListDto) {
    const list = await this.listService.create(createListDto);

    return { list };
  }

  @Put('/:id/title')
  public async editTitle(
    @Param('id') id: string,
    @Body() editTitleDto: EditTitleDto,
  ) {
    const list = await this.listService.editTitle(id, editTitleDto);

    return { list };
  }

  @Post('/move')
  public async move(
    @Body() moveListDto: MoveListDto,
  ) {
    const lists = await this.listService.moveList(moveListDto);

    return { lists };
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string) {
    const cardIds = await this.listService.remove(id);

    return { id, cardIds };
  }
}
