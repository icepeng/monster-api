import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';

import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  public async create(@Body() createBoardDto: CreateBoardDto) {
    const board = await this.boardService.create(createBoardDto);

    return { board };
  }

  @Get()
  public async getAll() {
    return this.boardService.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  @Delete('/:id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    const cardIds = await this.boardService.remove(id);

    return { id, cardIds };
  }
}