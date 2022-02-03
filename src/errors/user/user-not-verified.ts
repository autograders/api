import { APIError } from '@shared/utils/errors';

export class UserNotVerified extends APIError {
  constructor() {
    super({
      module: 'user',
      message: 'User not verified.'
    });
  }
}
