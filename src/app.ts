import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

import { GQLConfig } from '@configs/gql';
import { JWTConfig } from '@configs/jwt';
import { MailerConfig } from '@configs/mailer';
import { AuthResolver } from '@resolvers/auth';
import { PinResolver } from '@resolvers/pin';
import { AuthService } from '@services/auth';
import { CryptoService } from '@services/crypto';
import { PinService } from '@services/pin';
import { PrismaService } from '@services/prisma';
import { PubSubService } from '@services/pub-sub';
import { SessionService } from '@services/session';
import { JwtStrategy } from '@strategies/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot(GQLConfig),
    ScheduleModule.forRoot(),
    MailerModule.forRoot(MailerConfig),
    JwtModule.register(JWTConfig)
  ],
  controllers: [],
  providers: [
    // Resolvers
    AuthResolver,
    PinResolver,
    // Services
    AuthService,
    CryptoService,
    PinService,
    PrismaService,
    PubSubService,
    SessionService,
    // Strategies
    JwtStrategy
  ]
})
export class App {}
