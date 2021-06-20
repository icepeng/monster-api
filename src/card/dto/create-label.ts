import { IsInt, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsInt() listId: number;

  @IsString() title: string;

  @IsString() color: string;
}
