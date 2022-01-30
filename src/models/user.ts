import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  isVerified: boolean;

  @Prop({ required: true })
  isInstructor: boolean;

  @Prop({ required: true })
  isDeactivated: boolean;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
