import { APIError } from '@utils/errors';

export const ExpiredToken = new APIError({
  internalCode: 'expired-token',
  module: 'token',
  message: 'Expired token.'
});
