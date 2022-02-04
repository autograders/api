import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Get submission input.'
})
export class GetSubmissionInput {
  @Field(() => String, {
    nullable: false,
    description: 'Assignment id.'
  })
  @IsString()
  @IsNotEmpty()
  readonly assignmentId: string;
}
