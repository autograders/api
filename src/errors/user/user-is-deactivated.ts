import { APIError } from '@utils/errors';

export const UserIsDeactivated = new APIError({
  internalCode: 'user-is-deactivated',
  module: 'user',
  message: 'User is deactivated.'
});
