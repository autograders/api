import { registerEnumType } from '@nestjs/graphql';

export enum SubmissionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

registerEnumType(SubmissionStatus, {
  name: 'SubmissionStatus',
  description: 'Submission status.'
});
