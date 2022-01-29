import { APIError } from '@utils/errors';

export const InvalidToken = new APIError({
  internalCode: 'invalid-token',
  module: 'token',
  message: 'Invalid token.'
});
