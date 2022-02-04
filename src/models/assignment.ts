import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
@ObjectType({
  description: 'Assignment.'
})
export class Assignment {
  @Field(() => ID, {
    nullable: false,
    description: 'Assignment id.'
  })
  id: string;

  @Prop({
    type: String,
    required: true
  })
  @Field(() => String, {
    nullable: false,
    description: 'Assignment name.'
  })
  name: string;

  @Prop({
    type: String,
    required: true
  })
  @Field(() => String, {
    nullable: false,
    description: 'Assignment autograder.'
  })
  autograder: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  @Field(() => Boolean, {
    nullable: false,
    description: 'Assignment leaderboard flag.'
  })
  leaderboard: boolean;

  @Field(() => Date, {
    nullable: false,
    description: 'Assignment created at.'
  })
  createdAt: Date;

  @Field(() => Date, {
    nullable: false,
    description: 'Assignment updated at.'
  })
  updatedAt: Date;
}

export type AssignmentDocument = Assignment & Document;

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
