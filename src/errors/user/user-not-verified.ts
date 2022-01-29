import { APIError } from '@utils/errors';

export const UserNotVerified = new APIError({
  internalCode: 'user-not-verified',
  module: 'user',
  message: 'User not verified.'
});
