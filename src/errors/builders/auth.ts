import { HttpStatus } from '@nestjs/common';

export enum AuthCodes {
  FORBIDDEN = 'auth-001',
  UNAUTHORIZED = 'auth-002',
  WRONG_CREDENTIALS = 'auth-003'
}

export const AuthErrors = [
  {
    message: 'Forbidden.',
    code: AuthCodes.FORBIDDEN,
    status: HttpStatus.FORBIDDEN
  },
  {
    message: 'Unauthorized.',
    code: AuthCodes.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED
  },
  {
    message: 'Wrong credentials.',
    code: AuthCodes.WRONG_CREDENTIALS,
    status: HttpStatus.BAD_REQUEST
  }
];
