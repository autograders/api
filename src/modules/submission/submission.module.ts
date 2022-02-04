import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Assignment, AssignmentSchema } from '@models/assignment';
import { Submission, SubmissionSchema } from '@models/submission';
import { S3Module } from '@modules/s3';

import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assignment.name, schema: AssignmentSchema },
      { name: Submission.name, schema: SubmissionSchema }
    ]),
    S3Module
  ],
  providers: [SubmissionResolver, SubmissionService],
  exports: [SubmissionService]
})
export class SubmissionModule {}
