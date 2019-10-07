module.exports = {
  // collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/src/modules/**',
    '!**/src/common/**',
    '!**/src/app.module.ts',
    '!**/src/main.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  preset: 'ts-jest',
  setupFiles: ["dotenv/config"],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
};
