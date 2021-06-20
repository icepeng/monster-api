import { IsInt, IsString } from 'class-validator';

export class CreateListDto {
  @IsInt() boardId: number;

  @IsString() title: string;

  @IsInt() index: number;
}
