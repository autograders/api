import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { GQLConfig } from '@configs/gql';
import { JWTConfig } from '@configs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot(GQLConfig),
    ScheduleModule.forRoot(),
    JwtModule.register(JWTConfig)
  ],
  controllers: [],
  providers: []
})
export class App {}
