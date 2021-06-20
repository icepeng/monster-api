import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt() cardId: number;

  @IsString() content: string;
}
