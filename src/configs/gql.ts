import { GqlModuleOptions } from '@nestjs/graphql';
import { Request, Response } from 'express';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLUpload } from 'graphql-upload';

import { GQLContext } from '@interfaces/gql';
import { DateScalar } from '@scalars/date';
import { DateTimeScalar } from '@scalars/date-time';
import { VoidScalar } from '@scalars/void';

import { AppConfig } from './app';
import { EnvConfig } from './env';

function createContext(req: Request, res: Response): GQLContext {
  return {
    req,
    res
  };
}

export const GQLConfig: GqlModuleOptions = {
  playground: EnvConfig.isDev,
  typePaths: ['./**/*.graphql'],
  installSubscriptionHandlers: true,
  formatError: (error) => {
    if (error.extensions?.exception) {
      const extensions = error.extensions;
      delete extensions.exception;
      return { ...error, extensions };
    }

    return error;
  },
  context: ({ req, res, connection }) => {
    if (connection) return connection.context;

    return createContext(req, res);
  },
  cors: AppConfig.cors,
  resolvers: {
    Void: VoidScalar,
    Date: DateScalar,
    DateTime: DateTimeScalar,
    JSON: GraphQLJSON,
    Upload: GraphQLUpload
  }
};
