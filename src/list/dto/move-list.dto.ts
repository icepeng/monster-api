import { IsInt } from 'class-validator';

export class MoveListDto {
  @IsInt() boardId: number;

  @IsInt() previousIndex: number;

  @IsInt() currentIndex: number;
}
