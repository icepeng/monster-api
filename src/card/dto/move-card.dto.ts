import { IsInt } from 'class-validator';

export class MoveCardDto {
  @IsInt() previousListId: number;

  @IsInt() currentListId: number;

  @IsInt() previousIndex: number;

  @IsInt() currentIndex: number;
}
