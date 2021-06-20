import { IsInt, IsString } from 'class-validator';

export class MoveCardDto {
  @IsString() previousListId: string;

  @IsString() currentListId: string;

  @IsInt() previousIndex: number;

  @IsInt() currentIndex: number;
}
