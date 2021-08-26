/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.tsx'],
  globals: {
    'ts-jest': {
      tsconfig: './src/__tests__/tsconfig.json',
    },
  },
}
