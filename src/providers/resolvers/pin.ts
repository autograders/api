import { Args, Query, Resolver } from '@nestjs/graphql';

import { EmailInput } from '@inputs/common';
import { PinService } from '@services/pin';

@Resolver()
export class PinResolver {
  constructor(private readonly pin: PinService) {}

  @Query()
  async getPin(@Args('input') input: EmailInput) {
    return await this.pin.generate(input);
  }
}
