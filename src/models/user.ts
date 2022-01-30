import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
export class User {
  @Prop({
    type: String,
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: String,
    required: true
  })
  firstName: string;

  @Prop({
    type: String,
    required: true
  })
  lastName: string;

  @Prop({
    type: String
  })
  avatar: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isVerified: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  isInstructor: boolean;

  @Prop({
    type: Boolean,
    default: false
  })
  isDeactivated: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
