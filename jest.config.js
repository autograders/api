const tsconfig = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  roots: ['test'],
  verbose: true,
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'json'],
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.ts$': 'ts-jest' },
  collectCoverageFrom: ['src/providers/services/{!(prisma|pub-sub|s3),}.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>'
  })
};
