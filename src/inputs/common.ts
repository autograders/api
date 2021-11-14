import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class IdInput {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}

export class EmailInput {
  @IsEmail()
  readonly email: string;
}

export class PinInput {
  @IsString()
  @IsNotEmpty()
  readonly key: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;
}
