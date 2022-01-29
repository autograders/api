import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailInput {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
