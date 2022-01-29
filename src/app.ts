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

@Module({
  imports: [
    GraphQLModule.forRoot(GQLConfig),
    MailerModule.forRoot(MailerConfig),
    MongooseModule.forRoot(DBConfig.url),
    ScheduleModule.forRoot(),
    JwtModule.register(JWTConfig)
  ],
  controllers: [],
  providers: []
})
export class App {}
