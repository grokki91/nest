import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookCommentDocument = BookCommentModel & Document;

@Schema()
export class BookCommentModel {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Book' })
  public bookId: Types.ObjectId;

  @Prop({ required: true })
  public comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookCommentModel);
