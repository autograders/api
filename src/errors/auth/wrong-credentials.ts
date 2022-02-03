import { APIError } from '@shared/utils/errors';

export class WrongCredentials extends APIError {
  constructor() {
    super({
      module: 'auth',
      message: 'Wrong user credentials.'
    });
  }
}
