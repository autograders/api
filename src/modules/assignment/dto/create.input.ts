import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({
  description: 'Create assignment input.'
})
export class CreateAssignmentInput {
  @Field(() => String, {
    nullable: false,
    description: 'Assignment name.'
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Assignment autograder.'
  })
  @IsString()
  @IsNotEmpty()
  readonly autograder: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Assignment leaderboard flag.'
  })
  @IsBoolean()
  @IsOptional()
  readonly leaderboard?: boolean;
}
