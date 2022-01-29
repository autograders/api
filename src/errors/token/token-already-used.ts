import { APIError } from '@utils/errors';

export const TokenAlreadyUsed = new APIError({
  internalCode: 'token-already-used',
  module: 'token',
  message: 'Token already used.'
});
