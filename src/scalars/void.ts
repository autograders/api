import { GraphQLScalarType } from 'graphql';

export const VoidScalar = new GraphQLScalarType({
  name: 'Void',
  description: 'Represents NULL values',
  serialize: () => null,
  parseValue: () => null,
  parseLiteral: () => null
});
