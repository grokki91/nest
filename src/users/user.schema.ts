import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true, index: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
