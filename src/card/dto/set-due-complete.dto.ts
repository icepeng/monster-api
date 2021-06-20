import { IsBoolean } from 'class-validator';

export class SetDueCompleteDto {
  @IsBoolean() dueComplete: boolean;
}
