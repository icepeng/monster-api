import { IsInt, IsString } from 'class-validator';

export class CreateLabelDto {
  @IsInt() boardId: number;

  @IsString() title: string;

  @IsString() color: string;
}
