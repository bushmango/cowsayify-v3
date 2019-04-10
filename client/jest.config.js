// const { pathsToModuleNameMapper } = require('ts-jest/utils')
// const { compilerOptions } = require('./tsconfig.jest')

// console.log(
//   compilerOptions.paths,
//   pathsToModuleNameMapper(compilerOptions.paths, {
//     prefix: '<rootDir>/'
//   })
// )

module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  // rootDir: './',
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@imports/(.*)$': '<rootDir>/imports/$1',
    '^@state/(.*)$': '<rootDir>/state/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
  },

  testMatch: ['**/*.spec.(ts|tsx)'],
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
  coveragePathIgnorePatterns: ['/node_modules/']
}
