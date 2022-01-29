import { IsEmail } from 'class-validator';

export class ForgotPasswordInput {
  @IsEmail()
  readonly email: string;
}
