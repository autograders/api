import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType({
  description: 'Delete assignment input.'
})
export class DeleteAssignmentInput {
  @Field(() => String, {
    nullable: false,
    description: 'Assignment id.'
  })
  @IsString()
  @IsNotEmpty()
  readonly assignmentId: string;
}
