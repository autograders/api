import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

import { Submission } from '@models/submission';
import { User } from '@models/user';
import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { UserGuard } from '@shared/guards/user.guard';

import { CreateSubmissionInput } from './dto/create.input';
import { GetSubmissionInput } from './dto/get.input';
import { SubmissionService } from './submission.service';

@Resolver()
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Query(() => Submission, {
    nullable: false,
    description: 'Get submission.'
  })
  @UseGuards(UserGuard)
  getSubmission(
    @AuthUser() user: User,
    @Args('input') input: GetSubmissionInput
  ) {
    return this.submissionService.get(user, input);
  }

  @Query(() => Submission, {
    nullable: true,
    description: 'Get best submission.'
  })
  @UseGuards(UserGuard)
  getBestSubmission(
    @AuthUser() user: User,
    @Args('input') input: GetSubmissionInput
  ) {
    return this.submissionService.getBest(user, input);
  }

  @Mutation(() => Submission, {
    nullable: false,
    description: 'Create submission.'
  })
  @UseGuards(UserGuard)
  createSubmission(
    @AuthUser() user: User,
    @Args('input') input: CreateSubmissionInput,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload
  ) {
    return this.submissionService.create(user, input, file);
  }
}
