import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({
  description: 'Patch assignment input.'
})
export class PatchAssignmentInput {
  @Field(() => String, {
    nullable: false,
    description: 'Assignment id.'
  })
  @IsString()
  @IsNotEmpty()
  readonly assignmentId: string;

  @Field(() => String, {
    nullable: true,
    description: 'Assignment name.'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Assignment autograder.'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly autograder?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Assignment leaderboard flag.'
  })
  @IsBoolean()
  @IsOptional()
  readonly leaderboard?: boolean;
}
