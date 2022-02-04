import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
@ObjectType({
  description: 'User.'
})
export class User {
  @Field(() => ID, {
    nullable: false,
    description: 'User id.'
  })
  id: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  @Field(() => String, {
    nullable: false,
    description: 'User email.'
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
  @Field(() => String, {
    nullable: false,
    description: 'User first name.'
  })
  firstName: string;

  @Prop({
    type: String,
    required: true
  })
  @Field(() => String, {
    nullable: false,
    description: 'User last name.'
  })
  lastName: string;

  @Prop({
    type: String,
    required: false,
    default: null
  })
  @Field(() => String, {
    nullable: true,
    description: 'User avatar.'
  })
  avatar: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  @Field(() => Boolean, {
    nullable: false,
    description: 'User is verified flag.'
  })
  isVerified: boolean;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  @Field(() => Boolean, {
    nullable: false,
    description: 'User is instructor flag.'
  })
  isInstructor: boolean;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  @Field(() => Boolean, {
    nullable: false,
    description: 'User is deactivated flag.'
  })
  isDeactivated: boolean;

  @Field(() => Date, {
    nullable: false,
    description: 'User created at.'
  })
  createdAt: Date;

  @Field(() => Date, {
    nullable: false,
    description: 'User updated at.'
  })
  updatedAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
