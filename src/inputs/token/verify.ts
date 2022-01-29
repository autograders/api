import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenInput {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsEmail()
  readonly email: string;
}
