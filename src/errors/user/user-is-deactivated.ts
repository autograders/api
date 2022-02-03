import { APIError } from '@shared/utils/errors';

export class UserIsDeactivated extends APIError {
  constructor() {
    super({
      module: 'user',
      message: 'User is deactivated.'
    });
  }
}
