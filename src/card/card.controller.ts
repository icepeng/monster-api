import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { EditDescriptionDto } from './dto/edit-description.dto';
import { EditTitleDto } from './dto/edit-title.dto';
import { SetDueCompleteDto } from './dto/set-due.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  public async create(@Body() createCardDto: CreateCardDto) {
    const card = await this.cardService.create(createCardDto);

    return { card };
  }

  @Put('/:id/title')
  public async editTitle(
    @Param('id') id: string,
    @Body() editTitleDto: EditTitleDto,
  ) {
    const card = await this.cardService.editTitle(id, editTitleDto);

    return { card };
  }

  @Put('/:id/description')
  public async editDescription(
    @Param('id') id: string,
    @Body() editDescriptionDto: EditDescriptionDto,
  ) {
    const card = await this.cardService.editDescription(id, editDescriptionDto);

    return { card };
  }

  @Put('/:id/dueComplete')
  public async setDueComplete(
    @Param('id') id: string,
    @Body() setDueCompleteDto: SetDueCompleteDto,
  ) {
    const card = await this.cardService.setDueComplete(id, setDueCompleteDto);

    return { card };
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string) {
    await this.cardService.remove(id);

    return { id };
  }
}
