import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AssignmentNotFound } from '@errors/assignment/assignment-not-found';
import { Assignment, AssignmentDocument } from '@models/assignment';

import { CreateAssignmentInput } from './dto/create.input';
import { DeleteAssignmentInput } from './dto/delete.input';
import { PatchAssignmentInput } from './dto/patch.input';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name)
    private readonly assignmentModel: Model<AssignmentDocument>
  ) {}

  async findAll() {
    return await this.assignmentModel.find({});
  }

  async create(input: CreateAssignmentInput) {
    return await this.assignmentModel.create({
      name: input.name,
      autograder: input.autograder,
      leaderboard: input.leaderboard
    });
  }

  async patch(input: PatchAssignmentInput) {
    const assignment = await this.assignmentModel.findByIdAndUpdate(
      input.assignmentId,
      {
        $set: {
          name: input.name,
          autograder: input.autograder,
          leaderboard: input.leaderboard
        }
      },
      {
        returnDocument: 'after'
      }
    );

    if (!assignment) {
      throw new AssignmentNotFound();
    }

    return assignment;
  }

  async delete(input: DeleteAssignmentInput) {
    const assignment = await this.assignmentModel.findByIdAndDelete(
      input.assignmentId
    );

    if (!assignment) {
      throw new AssignmentNotFound();
    }

    return assignment;
  }
}
