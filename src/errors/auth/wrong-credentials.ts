import { APIError } from '@utils/errors';

export const WrongCredentials = new APIError({
  internalCode: 'wrong-credentials',
  module: 'auth',
  message: 'Wrong user credentials.'
});
