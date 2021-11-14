import { HttpStatus } from '@nestjs/common';

export enum UserCodes {
  USER_ALREADY_EXIST = 'user-001',
  USER_IS_DEACTIVATED = 'user-002',
  USER_DOES_NOT_EXIST = 'user-003',
  EMAIL_NOT_VERIFIED = 'user-004'
}

export const UserErrors = [
  {
    message: 'User already exist.',
    code: UserCodes.USER_ALREADY_EXIST,
    status: HttpStatus.BAD_REQUEST
  },
  {
    message: 'User is deactivated.',
    code: UserCodes.USER_IS_DEACTIVATED,
    status: HttpStatus.BAD_REQUEST
  },
  {
    message: 'User does not exist.',
    code: UserCodes.USER_DOES_NOT_EXIST,
    status: HttpStatus.BAD_REQUEST
  },
  {
    message: 'User email is not verified.',
    code: UserCodes.EMAIL_NOT_VERIFIED,
    status: HttpStatus.BAD_REQUEST
  }
];
