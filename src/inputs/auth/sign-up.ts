import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsStrongPassword } from '@validators/password';

export class SignUpInput {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
