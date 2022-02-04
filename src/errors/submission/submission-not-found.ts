import { APIError } from '@shared/utils/errors';

export class SubmissionNotFound extends APIError {
  constructor() {
    super({
      module: 'submission',
      message: 'Submission not found.'
    });
  }
}
