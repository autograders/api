import { APIError } from '@shared/utils/errors';

export class UserNotFound extends APIError {
  constructor() {
    super({
      module: 'user',
      message: 'User not found.'
    });
  }
}
