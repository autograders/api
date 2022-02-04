import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Create submission input.'
})
export class CreateSubmissionInput {
  @Field(() => String, {
    nullable: false,
    description: 'Assignment id.'
  })
  @IsString()
  @IsNotEmpty()
  readonly assignmentId: string;
}
