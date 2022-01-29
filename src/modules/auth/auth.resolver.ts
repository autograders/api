import { Query, Resolver } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => [GraphQLJSONObject], {
    description: 'Find all users'
  })
  findAll() {
    return this.authService.findAll();
  }
}
