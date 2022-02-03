import { APIError } from 'src/shared/utils/errors';

export class TokenAlreadyUsed extends APIError {
  constructor() {
    super({
      module: 'token',
      message: 'Token already used.'
    });
  }
}
