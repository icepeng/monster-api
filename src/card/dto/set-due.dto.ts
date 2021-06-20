import { IsString } from 'class-validator';

export class SetDueDto {
  @IsString() due: string;
}
