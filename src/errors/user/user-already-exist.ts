import { APIError } from '@shared/utils/errors';

export class UserAlreadyExist extends APIError {
  constructor() {
    super({
      module: 'user',
      message: 'User already exist.'
    });
  }
}
