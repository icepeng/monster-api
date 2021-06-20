import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { AddLabelDto } from './dto/add-label';
import { CreateCardDto } from './dto/create-card.dto';
import { EditDescriptionDto } from './dto/edit-description.dto';
import { EditTitleDto } from './dto/edit-title.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { SetDueCompleteDto } from './dto/set-due-complete.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  public async create(@Body() createCardDto: CreateCardDto) {
    const card = await this.cardService.create(createCardDto);

    return { card };
  }

  @Post('/move')
  public async move(@Body() moveCardDto: MoveCardDto) {
    const cards = await this.cardService.moveCard(moveCardDto);

    return { cards };
  }

  @Put('/:id/title')
  public async editTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTitleDto: EditTitleDto,
  ) {
    const card = await this.cardService.editTitle(id, editTitleDto);

    return { card };
  }

  @Put('/:id/description')
  public async editDescription(
    @Param('id', ParseIntPipe) id: number,
    @Body() editDescriptionDto: EditDescriptionDto,
  ) {
    const card = await this.cardService.editDescription(id, editDescriptionDto);

    return { card };
  }

  @Put('/:id/dueComplete')
  public async setDueComplete(
    @Param('id', ParseIntPipe) id: number,
    @Body() setDueCompleteDto: SetDueCompleteDto,
  ) {
    const card = await this.cardService.setDueComplete(id, setDueCompleteDto);

    return { card };
  }

  @Delete('/:id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    await this.cardService.remove(id);

    return { id };
  }

  @Post('/:id/labels')
  public async addLabel(
    @Param('id', ParseIntPipe) id: number,
    @Body() addLabelDto: AddLabelDto,
  ) {
    const result = await this.cardService.addLabel(id, addLabelDto);

    return result;
  }

  @Delete('/:id/labels/:labelId')
  public async dropLabel(
    @Param('id', ParseIntPipe) id: number,
    @Param('labelId', ParseIntPipe) labelId: number,
  ) {
    const result = await this.cardService.dropLabel(id, labelId);

    return result;
  }
}
