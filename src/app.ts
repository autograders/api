import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

import { GQLConfig } from '@configs/gql';
import { JWTConfig } from '@configs/jwt';
import { MailerConfig } from '@configs/mailer';
import { AuthResolver } from '@resolvers/auth';
import { AuthService } from '@services/auth';
import { DBService } from '@services/db';
import { PasswordService } from '@services/password';
import { PubSubService } from '@services/pub-sub';
import { TokenService } from '@services/token';
import { JwtStrategy } from '@strategies/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot(GQLConfig),
    JwtModule.register(JWTConfig),
    MailerModule.forRoot(MailerConfig),
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [
    // resolvers
    AuthResolver,
    // services
    AuthService,
    DBService,
    PasswordService,
    PubSubService,
    TokenService,
    // strategies
    JwtStrategy
  ]
})
export class App {}
