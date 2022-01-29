import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as Filter,
  ForbiddenException,
  HttpException,
  UnauthorizedException
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} from 'apollo-server-errors';
import { Request, Response } from 'express';

import { APIError } from '@utils/errors';

@Catch()
export class ExceptionFilter implements Filter {
  catch(exception: any, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() !== 'graphql') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      if (exception instanceof HttpException) {
        const status = exception.getStatus();
        return response.status(status).json({
          message: exception.message,
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url
        });
      } else {
        return response.status(500).json({
          message: 'Internal Server Error',
          statusCode: 500,
          timestamp: new Date().toISOString(),
          path: request.url
        });
      }
    }

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

    console.log(exception);

    return new ApolloError('Internal server error, try again.', 'internal', {
      module: '505',
      timestamp: new Date().toISOString()
    });
  }
}
