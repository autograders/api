import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { JWTConfig } from '@configs/jwt';
import { User, UserSchema } from '@models/user';
import { TokenModule } from '@modules/token';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    JwtModule.register(JWTConfig),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokenModule
  ],
  providers: [AuthResolver, AuthService, AuthStrategy]
})
export class AuthModule {}
