import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload } from 'graphql-upload';
import { Model } from 'mongoose';

import { AssignmentNotFound } from '@errors/assignment/assignment-not-found';
import { InvalidSubmissionFile } from '@errors/submission/invalid-submission-file';
import { Assignment, AssignmentDocument } from '@models/assignment';
import { Submission, SubmissionDocument } from '@models/submission';
import { User } from '@models/user';
import { S3Service } from '@modules/s3';
import { SubmissionStatus } from '@shared/enums/submission-status';
import { streamToBuffer } from '@shared/utils/stream';

import { CreateSubmissionInput } from './dto/create.input';
import { GetSubmissionInput } from './dto/get.input';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Assignment.name)
    private readonly assignmentModel: Model<AssignmentDocument>,
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    private readonly s3: S3Service
  ) {}

  async get(user: User, input: GetSubmissionInput) {
    const assignment = await this.assignmentModel.findById(input.assignmentId);

    if (!assignment) {
      throw new AssignmentNotFound();
    }

    const result = await this.submissionModel
      .find({
        user,
        assignment
      })
      .sort('createdAt')
      .limit(1)
      .populate('user')
      .populate('assignment');

    return result.pop();
  }

  async getBest(user: User, input: GetSubmissionInput) {
    const assignment = await this.assignmentModel.findById(input.assignmentId);

    if (!assignment) {
      throw new AssignmentNotFound();
    }

    const result = await this.submissionModel
      .find({
        user,
        assignment,
        status: {
          $in: [SubmissionStatus.COMPLETED]
        }
      })
      .sort('score')
      .limit(1)
      .populate('user')
      .populate('assignment');

    return result.pop();
  }

  async create(user: User, input: CreateSubmissionInput, file: FileUpload) {
    const assignment = await this.assignmentModel.findById(input.assignmentId);

    if (!assignment) {
      throw new AssignmentNotFound();
    }

    const submission = await this.submissionModel.findOne({
      user,
      assignment,
      status: {
        $in: [SubmissionStatus.IN_PROGRESS, SubmissionStatus.PENDING]
      }
    });

    const filename = `users/${user.id}/${assignment.id}/submit.zip`;
    const stream = file.createReadStream();
    const allowedMIMETypes = ['application/zip'];
    const validMimeType = allowedMIMETypes.includes(file.mimetype);

    if (!validMimeType) {
      throw new InvalidSubmissionFile();
    }

    const buffer = await streamToBuffer(stream);
    await this.s3.uploadPrivateFile(filename, file.mimetype, buffer);

    if (submission && submission.status === SubmissionStatus.PENDING) {
      return await this.submissionModel
        .findByIdAndUpdate(
          submission.id,
          {
            $set: {
              sourceCode: filename
            }
          },
          {
            returnDocument: 'after'
          }
        )
        .populate('user')
        .populate('assignment');
    }

    return await this.submissionModel.create({
      user,
      assignment,
      sourceCode: filename
    });
  }
}
