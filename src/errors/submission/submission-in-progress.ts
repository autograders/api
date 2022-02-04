import { APIError } from '@shared/utils/errors';

export class SubmissionInProgress extends APIError {
  constructor() {
    super({
      module: 'submission',
      message: 'A submission is in progress for the assignment.'
    });
  }
}
