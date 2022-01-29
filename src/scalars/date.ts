import { format } from 'date-fns';
import { GraphQLScalarType, Kind } from 'graphql';

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Represents Date values',
  serialize: (value: Date) => format(value, 'yyyy-MM-dd'),
  parseValue: (value: string) => new Date(value),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }

    return null;
  }
});
