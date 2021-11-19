import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as JWTAuthGuard } from '@nestjs/passport';

import { AppConfig } from '@configs/app';
import { SessionConfig } from '@configs/session';
import { Codes, Raise } from '@errors';
import { GQLContext } from '@interfaces/gql';

@Injectable()
export class AuthGuard extends JWTAuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext<GQLContext>();

    try {
      const result = await super.canActivate(context);

      if (!result) {
        ctx.res.clearCookie(SessionConfig.cookie, {
          path: '/',
          domain: AppConfig.domain
        });
        Raise(Codes.UNAUTHORIZED);
      }

      return result as boolean;
    } catch (error) {
      ctx.res.clearCookie(SessionConfig.cookie, {
        path: '/',
        domain: AppConfig.domain
      });
      Raise(Codes.UNAUTHORIZED);
    }
  }
}
