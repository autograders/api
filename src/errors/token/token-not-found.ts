import { APIError } from '@utils/errors';

export const TokenNotFound = new APIError({
  internalCode: 'token-not-found',
  module: 'token',
  message: 'Token not found.'
});
