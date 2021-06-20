import { IsInt, IsString } from 'class-validator';

export class CreateListDto {
  @IsString() boardId: string;

  @IsString() title: string;

  @IsInt() index: number;
}
