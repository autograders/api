import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Assignment } from '@models/assignment';
import { InstructorGuard } from '@shared/guards/instructor.guard';
import { UserGuard } from '@shared/guards/user.guard';

import { AssignmentService } from './assignment.service';
import { CreateAssignmentInput } from './dto/create.input';
import { DeleteAssignmentInput } from './dto/delete.input';
import { PatchAssignmentInput } from './dto/patch.input';

@Resolver(() => Assignment)
export class AssignmentResolver {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Query(() => [Assignment], {
    description: 'Get assignments.'
  })
  @UseGuards(UserGuard, InstructorGuard)
  getAssignments() {
    return this.assignmentService.findAll();
  }

  @Mutation(() => Assignment, {
    description: 'Create assignment.'
  })
  @UseGuards(UserGuard, InstructorGuard)
  createAssignment(@Args('input') input: CreateAssignmentInput) {
    return this.assignmentService.create(input);
  }

  @Mutation(() => Assignment, {
    description: 'Patch assignment.'
  })
  @UseGuards(UserGuard, InstructorGuard)
  patchAssignment(@Args('input') input: PatchAssignmentInput) {
    return this.assignmentService.patch(input);
  }

  @Mutation(() => Assignment, {
    description: 'Delete assignment.'
  })
  @UseGuards(UserGuard, InstructorGuard)
  deleteAssignment(@Args('input') input: DeleteAssignmentInput) {
    return this.assignmentService.delete(input);
  }
}
