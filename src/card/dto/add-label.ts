import { IsInt } from 'class-validator';

export class AddLabelDto {
  @IsInt() labelId: number;
}
