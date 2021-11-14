import { GqlModuleOptions } from '@nestjs/graphql';
import { format } from 'date-fns';
import { GraphQLScalarType, Kind } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import { join } from 'path';

import { AppConfig } from './app';
import { EnvConfig } from './env';

export const GQLConfig: GqlModuleOptions = {
  playground: EnvConfig.isDev,
  typePaths: [join(__dirname, '..', 'schema.graphql')],
  installSubscriptionHandlers: true,
  context: ({ req, res, connection }) => {
    if (connection) return connection.context;

    return {
      req,
      res
    };
  },
  cors: AppConfig.cors,
  subscriptions: {
    'subscriptions-transport-ws': {
      onConnect: () => {
        /*
         * NOTE:
         *
         * There is a bug in subscriptions-transport-ws that allows connections
         * to skip the onConnect phase (read more). You should not assume that onConnect
         * was called when the user starts a subscription, and always check that the context
         * is populated.
         *
         * ref: https://github.com/apollographql/subscriptions-transport-ws/issues/349
         */
        try {
          return true;
        } catch (error) {
          return {};
        }
      }
    }
  },
  resolvers: {
    Void: new GraphQLScalarType({
      name: 'Void',
      description: 'Represents NULL values',
      serialize: () => null,
      parseValue: () => null,
      parseLiteral: () => null
    }),
    Date: new GraphQLScalarType({
      name: 'Date',
      description: 'Represents Date values',
      serialize: (value: Date) => format(value, 'yyyy-MM-dd'),
      parseValue: (value: string) => new Date(value),
      parseLiteral: (ast) => {
        if (ast.kind === Kind.STRING) return new Date(ast.value);

        return null;
      }
    }),
    DateTime: new GraphQLScalarType({
      name: 'DateTime',
      description: 'Represents Datetime values',
      serialize: (value: Date) => value.toISOString(),
      parseValue: (value: string) => new Date(value),
      parseLiteral: (ast) => {
        if (ast.kind === Kind.STRING) return new Date(ast.value);

        return null;
      }
    }),
    BigInt: new GraphQLScalarType({
      name: 'BigInt',
      description: 'Big integer values',
      serialize: (value: BigInt) => Number(value),
      parseValue: (value: string) => BigInt(value),
      parseLiteral: (ast) => {
        if (ast.kind === Kind.STRING) return BigInt(ast.value);

        return null;
      }
    }),
    Upload: GraphQLUpload
  }
};
