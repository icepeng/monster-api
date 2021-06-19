import { IsString } from 'class-validator';

export class EditTitleDto {
  @IsString() title: string;
}
