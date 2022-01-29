import { IsEmail } from 'class-validator';

export class ResendEmailVerificationInput {
  @IsEmail()
  readonly email: string;
}
