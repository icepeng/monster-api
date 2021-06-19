import { IsInt, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString() listId: string;

  @IsString() title: string;

  @IsInt() index: number;
}
