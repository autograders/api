import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User } from '@models/user';
import { GQLContext } from '@shared/interfaces/gql-context';

@Injectable()
export class InstructorGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx: GQLContext = GqlExecutionContext.create(context).getContext();
    const user = ctx.req.user as User;
    return user.isInstructor;
  }
}
