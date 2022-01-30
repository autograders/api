import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
export class Token {
  @Prop({
    type: Number,
    required: true
  })
  expiration: number;

  @Prop({
    type: String,
    unique: true
  })
  email: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isUsed: boolean;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
