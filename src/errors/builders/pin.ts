import { HttpStatus } from '@nestjs/common';

export enum PinCodes {
  INVALID_OR_EXPIRED_PIN = 'pin-001'
}

export const PinErrors = [
  {
    message: 'Invalid or expired code.',
    code: PinCodes.INVALID_OR_EXPIRED_PIN,
    status: HttpStatus.BAD_REQUEST
  }
];
