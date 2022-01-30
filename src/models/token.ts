import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Token {
  @Prop()
  expiration: number;

  @Prop({ unique: true })
  email: string;

  @Prop()
  isUsed: boolean;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
