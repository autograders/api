import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

import { GQLConfig } from '@configs/gql';
import { JWTConfig } from '@configs/jwt';
import { MailerConfig } from '@configs/mailer';
import { DBService } from '@services/db';
import { PubSubService } from '@services/pub-sub';

@Module({
  imports: [
    GraphQLModule.forRoot(GQLConfig),
    MailerModule.forRoot(MailerConfig),
    ScheduleModule.forRoot(),
    JwtModule.register(JWTConfig)
  ],
  controllers: [],
  providers: [DBService, PubSubService]
})
export class App {}
