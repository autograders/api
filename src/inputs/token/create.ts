import { IsEmail } from 'class-validator';

export class CreateTokenInput {
  @IsEmail()
  readonly email: string;
}
