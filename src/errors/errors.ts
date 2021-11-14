import { HttpException } from '@nestjs/common';

import { AuthCodes, AuthErrors } from './builders/auth';
import { PinCodes, PinErrors } from './builders/pin';
import { UserCodes, UserErrors } from './builders/user';

export const Codes = {
  ...AuthCodes,
  ...PinCodes,
  ...UserCodes
};

export function Raise(
  code: AuthCodes | PinCodes | UserCodes,
  params: Record<string, string> = {}
): never {
  const error = [...AuthErrors, ...PinErrors, ...UserErrors].find(
    (e) => e.code === code
  ) as any;

  const payload = Object.assign({}, params, {
    message: error.message,
    code: error.code,
    timestamp: new Date().toISOString()
  });

  throw new HttpException(payload, error.status);
}
