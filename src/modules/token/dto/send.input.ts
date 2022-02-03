import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum } from 'class-validator';

import { TokenType } from '@shared/enums/token-type';

@InputType({
  description: 'Send token input.'
})
export class SendTokenInput {
  @Field(() => TokenType, {
    nullable: false,
    description: 'Token type.'
  })
  @IsEnum(TokenType)
  readonly type: TokenType;

  @Field(() => String, {
    nullable: false,
    description: 'User email.'
  })
  @IsEmail()
  readonly email: string;
}
