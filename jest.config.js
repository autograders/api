const tsconfig = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');

const ignoreServices = [
  'db',
  'hello-sign',
  'house-canary',
  'location',
  'pub-sub',
  's3'
];

module.exports = {
  roots: ['test'],
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts$': 'ts-jest' },
  collectCoverageFrom: [`src/services/{!(${ignoreServices.join('|')}),}.ts`],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>'
  })
};
