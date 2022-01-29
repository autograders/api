import { APIError } from '@utils/errors';

export const UserNotFound = new APIError({
  internalCode: 'user-not-found',
  module: 'user',
  message: 'User not found.'
});
