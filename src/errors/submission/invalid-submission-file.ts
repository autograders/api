import { APIError } from '@shared/utils/errors';

export class InvalidSubmissionFile extends APIError {
  constructor() {
    super({
      module: 'submission',
      message: 'Invalid submission file.'
    });
  }
}
