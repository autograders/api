import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { TokenType } from '@shared/enums/token-type';

export class VerifyTokenInput {
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(TokenType)
  readonly type: TokenType;
}
