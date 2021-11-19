import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';

@Catch()
export class UnhandledExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let error: ApolloError;
    if (host.getType<GqlContextType>() !== 'graphql') return null;

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const data = exception.getResponse() as any;
      error = new ApolloError(exception.message, data.code, {
        status,
        timestamp: new Date().toISOString()
      });
    } else {
      error = new ApolloError('Internal server error, try again.', 'internal', {
        status: 500,
        timestamp: new Date().toISOString()
      });
    }

    return error;
  }
}
