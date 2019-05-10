// const { pathsToModuleNameMapper } = require('ts-jest/utils')
// const { compilerOptions } = require('./tsconfig.jest')

// console.log(
//   compilerOptions.paths,
//   pathsToModuleNameMapper(compilerOptions.paths, {
//     prefix: '<rootDir>/'
//   })
// )

module.exports = {
  testMatch: ['**/*.spec.(ts|tsx)'],

  // testEnvironment: 'node',
  // rootDir: './',
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/node_modules/jest-css-modules',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@imports/(.*)$': '<rootDir>/imports/$1',
    '^@state/(.*)$': '<rootDir>/state/$1',
    '^@components/(.*)$': '<rootDir>/components/$1'
  },

  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here
      babelConfig: true,
      tsConfig: 'tsconfig.jest.json'
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  verbose: false,
  setupFiles: ['<rootDir>/jest/globals.js'],
  setupFilesAfterEnv: ['react-testing-library/cleanup-after-each']
}
