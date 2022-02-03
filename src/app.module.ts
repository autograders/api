import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

import DBConfig from '@configs/db';
import { GQLConfig } from '@configs/gql';
import { MailerConfig } from '@configs/mailer';
import { AuthModule } from '@modules/auth';
import { TokenModule } from '@modules/token';

@Module({
  imports: [
    MongooseModule.forRoot(DBConfig.url),
    GraphQLModule.forRoot(GQLConfig),
    MailerModule.forRoot(MailerConfig),
    ScheduleModule.forRoot(),
    AuthModule,
    TokenModule
  ]
})
export class AppModule {}
