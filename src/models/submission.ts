import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { SubmissionStatus } from '@shared/enums/submission-status';

import { Assignment } from './assignment';
import { TestCase } from './test-case';
import { User } from './user';

@Schema({
  timestamps: true
})
@ObjectType({
  description: 'Submission.'
})
export class Submission {
  @Field(() => ID, {
    nullable: false,
    description: 'Submission id.'
  })
  id: string;

  @Prop({
    type: String,
    required: false,
    default: SubmissionStatus.PENDING
  })
  @Field(() => String, {
    nullable: false,
    description: 'Submission status.'
  })
  status: SubmissionStatus;

  @Prop({
    type: Number,
    required: false,
    default: 0.0
  })
  @Field(() => String, {
    nullable: false,
    description: 'Submission score.'
  })
  score: number;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  })
  @Field(() => User, {
    nullable: false,
    description: 'Submission user.'
  })
  user: User;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Assignment',
    required: true
  })
  @Field(() => Assignment, {
    nullable: false,
    description: 'Submission assignment.'
  })
  assignment: Assignment;

  @Prop({
    type: String,
    required: false,
    default: ''
  })
  @Field(() => String, {
    nullable: false,
    description: 'Submission output.'
  })
  output: string;

  @Prop({
    type: String,
    required: true
  })
  @Field(() => String, {
    nullable: false,
    description: 'Submission source code.'
  })
  sourceCode: string;

  @Prop([
    raw({
      name: {
        required: true,
        type: String
      },
      score: {
        required: true,
        type: Number
      },
      output: {
        required: false,
        type: String,
        default: ''
      }
    })
  ])
  @Field(() => [TestCase], {
    nullable: false,
    description: 'Submission test cases.'
  })
  testCases: TestCase[];

  @Field(() => Date, {
    nullable: false,
    description: 'Submission created at.'
  })
  createdAt: Date;

  @Field(() => Date, {
    nullable: false,
    description: 'Submission updated at.'
  })
  updatedAt: Date;
}

export type SubmissionDocument = Submission & Document;

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
