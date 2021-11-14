import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches
} from 'class-validator';

import { PasswordConfig } from '@configs/password';

import { PinInput } from './common';

export class SignUpInput {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Matches(PasswordConfig.regex, { message: 'Weak password' })
  readonly password: string;
}

export class SignInInput {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class SignOutInput {
  @IsBoolean()
  @IsOptional()
  readonly allDevices?: boolean;
}

export class ResetPasswordInput extends PinInput {
  @IsString()
  @Matches(PasswordConfig.regex, { message: 'Weak password' })
  readonly newPassword: string;
}
