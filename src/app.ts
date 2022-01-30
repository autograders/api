import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

import { DBConfig } from '@configs/db';
import { GQLConfig } from '@configs/gql';
import { JWTConfig } from '@configs/jwt';
import { MailerConfig } from '@configs/mailer';
import { Models } from '@models';
import { AuthResolver } from '@resolvers/auth';
import { AuthService } from '@services/auth';
import { PasswordService } from '@services/password';
import { PubSubService } from '@services/pub-sub';
import { TokenService } from '@services/token';
import { JwtStrategy } from '@strategies/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot(GQLConfig),
    JwtModule.register(JWTConfig),
    MailerModule.forRoot(MailerConfig),
    MongooseModule.forRoot(DBConfig.url),
    MongooseModule.forFeature(Models),
    ScheduleModule.forRoot()
  ],
  providers: [
    // resolvers
    AuthResolver,
    // services
    AuthService,
    PasswordService,
    PubSubService,
    TokenService,
    // strategies
    JwtStrategy
  ]
})
export class App {}
