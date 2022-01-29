import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsStrongPassword } from '@validators/password';

export class ResetPasswordInput {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsStrongPassword()
  readonly newPassword: string;
}
