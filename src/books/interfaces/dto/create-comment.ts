import { IsString, Validate } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export class CreateCommentDto {
  @IsString()
  @Validate(isValidObjectId)
  readonly bookId: string;

  @IsString()
  readonly comment: string;
}
