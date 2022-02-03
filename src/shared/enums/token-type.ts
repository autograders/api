import { registerEnumType } from '@nestjs/graphql';

export enum TokenType {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}

registerEnumType(TokenType, {
  name: 'TokenType',
  description: 'Token type.'
});
