import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload } from 'graphql-upload';
import { Model } from 'mongoose';

import { AssignmentNotFound } from '@errors/assignment/assignment-not-found';
import { InvalidSubmissionFile } from '@errors/submission/invalid-submission-file';
import { SubmissionNotFound } from '@errors/submission/submission-not-found';
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

    const submission = await this.submissionModel
      .findOne({
        user,
        assignment
      })
      .populate('user')
      .populate('assignment');

    if (!submission) {
      throw new SubmissionNotFound();
    }

    console.log(submission);

    return submission;
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
        $in: [SubmissionStatus.IN_PROGRESS, SubmissionStatus.IN_PROGRESS]
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
      return await this.submissionModel.findByIdAndUpdate(
        submission.id,
        {
          $set: {
            sourceCode: filename
          }
        },
        {
          returnDocument: 'after'
        }
      );
    }

    return await this.submissionModel.create({
      user,
      assignment,
      sourceCode: filename
    });
  }
}
