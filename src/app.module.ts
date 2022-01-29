import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';

import { GQLConfig } from '@configs/gql';
import { JWTConfig } from '@configs/jwt';
import { MailerConfig } from '@configs/mailer';
import { AuthModule } from '@modules/auth';

@Module({
  imports: [
    GraphQLModule.forRoot(GQLConfig),
    JwtModule.register(JWTConfig),
    MailerModule.forRoot(MailerConfig),
    ScheduleModule.forRoot(),
    AuthModule
  ]
})
export class AppModule {}
