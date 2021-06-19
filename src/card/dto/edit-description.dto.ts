import { IsString } from 'class-validator';

export class EditDescriptionDto {
  @IsString() description: string;
}
