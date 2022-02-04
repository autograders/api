import { APIError } from '@shared/utils/errors';

export class InvalidToken extends APIError {
  constructor() {
    super({
      module: 'token',
      message: 'Invalid token.'
    });
  }
}
