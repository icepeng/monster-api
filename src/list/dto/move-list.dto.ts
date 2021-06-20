import { IsInt } from 'class-validator';

export class MoveListDto {
  @IsInt() previousIndex: number;

  @IsInt() currentIndex: number;
}
