import { APIError } from '@shared/utils/errors';

export class AssignmentNotFound extends APIError {
  constructor() {
    super({
      module: 'assignment',
      message: 'Assignment not found.'
    });
  }
}
