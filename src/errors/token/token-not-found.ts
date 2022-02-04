import { APIError } from 'src/shared/utils/errors';

export class TokenNotFound extends APIError {
  constructor() {
    super({
      module: 'token',
      message: 'Token not found.'
    });
  }
}
