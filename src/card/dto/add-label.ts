import { IsString } from 'class-validator';

export class AddLabelDto {
  @IsString() labelId: string;
}
