import { Controller, Get, Param } from '@nestjs/common';

import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/:id')
  public async getOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }
}