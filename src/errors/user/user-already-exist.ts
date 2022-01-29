import { APIError } from '@utils/errors';

export const UserAlreadyExist = new APIError({
  internalCode: 'user-already-exist',
  module: 'user',
  message: 'User already exist.'
});
