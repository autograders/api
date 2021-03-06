import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { TokenType } from '@shared/enums/token-type';

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
    required: true
  })
  type: TokenType;

  @Prop({
    type: String,
    required: true
  })
  email: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  isUsed: boolean;
}

export type TokenDocument = Token & Document;

export const TokenSchema = SchemaFactory.createForClass(Token);
