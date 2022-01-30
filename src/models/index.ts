import { Token, TokenSchema } from './token';
import { User, UserSchema } from './user';

export const Models = [
  { name: Token.name, schema: TokenSchema },
  { name: User.name, schema: UserSchema }
];
