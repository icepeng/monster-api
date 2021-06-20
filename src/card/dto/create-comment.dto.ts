import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString() cardId: string;

  @IsString() content: string;
}
