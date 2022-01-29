import { GqlModuleOptions } from '@nestjs/graphql';

import { AppConfig } from './app';
import { EnvConfig } from './env';

export const GQLConfig: GqlModuleOptions = {
  playground: EnvConfig.isDev,
  installSubscriptionHandlers: true,
  autoSchemaFile: './graphql/schema.gql',
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
    return { req, res };
  },
  cors: AppConfig.cors
};
