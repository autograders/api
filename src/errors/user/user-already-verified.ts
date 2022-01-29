import { APIError } from '@utils/errors';

export const UserAlreadyVerified = new APIError({
  internalCode: 'user-already-verified',
  module: 'user',
  message: 'User already verified.'
});
