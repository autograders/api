import { APIError } from '@shared/utils/errors';

export class ExpiredToken extends APIError {
  constructor() {
    super({
      module: 'token',
      message: 'Expired token.'
    });
  }
}
