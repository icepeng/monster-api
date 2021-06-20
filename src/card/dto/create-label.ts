import { IsString } from 'class-validator';

export class CreateLabelDto {
  @IsString() listId: string;

  @IsString() title: string;

  @IsString() color: string;
}
