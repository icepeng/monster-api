import { IsInt, IsString } from 'class-validator';

export class CreateCardDto {
  @IsInt() listId: number;

  @IsString() title: string;

  @IsInt() index: number;
}
