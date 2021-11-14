import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as JWTAuthGuard } from '@nestjs/passport';

import { Codes, Raise } from '@errors';

@Injectable()
export class AuthGuard extends JWTAuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const result = await super.canActivate(context);

      if (!result) Raise(Codes.UNAUTHORIZED);

      return result as boolean;
    } catch (error) {
      Raise(Codes.UNAUTHORIZED);
    }
  }
}
