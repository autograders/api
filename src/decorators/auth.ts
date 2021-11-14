import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): User => {
    return GqlExecutionContext.create(context).getContext().req.user;
  }
);
