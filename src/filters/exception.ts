import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as Filter,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} from 'apollo-server-errors';

import { APIError } from '@utils/errors';

@Catch()
export class ExceptionFilter implements Filter {
  catch(exception: any, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() !== 'graphql') return null;

    if (exception instanceof APIError) {
      return new ApolloError(exception.message, exception.internalCode, {
        internalCode: exception.internalCode,
        module: exception.module,
        message: exception.message,
        ...exception.additional,
        timestamp: new Date().toISOString()
      });
    }

    if (exception instanceof UnauthorizedException) {
      return new AuthenticationError('Unauthorized', {
        module: 'auth',
        timestamp: new Date().toISOString()
      });
    }

    if (exception instanceof ForbiddenException) {
      return new ForbiddenError('Forbidden', {
        module: 'auth',
        timestamp: new Date().toISOString()
      });
    }

    return new ApolloError('Internal server error, try again.', 'internal', {
      module: '505',
      timestamp: new Date().toISOString()
    });
  }
}
