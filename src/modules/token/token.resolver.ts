import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SendTokenInput } from './dto/send.input';
import { TokenService } from './token.service';

@Resolver()
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation(() => Boolean, {
    nullable: false,
    description: 'Send token.'
  })
  sendToken(@Args('input') input: SendTokenInput) {
    return this.tokenService.send(input);
  }
}
