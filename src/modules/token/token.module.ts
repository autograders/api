import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Token, TokenSchema } from '@models/token';
import { User, UserSchema } from '@models/user';

import { TokenResolver } from './token.resolver';
import { TokenService } from './token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [TokenResolver, TokenService],
  exports: [TokenService]
})
export class TokenModule {}
