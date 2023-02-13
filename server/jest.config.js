module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    collectCoverage: true,
    transform: {
      '^.+\\.ts$': [
        'ts-jest', 
        {
            babelConfig: true,
        },
    ]
    },
    setupFiles: ['<rootDir>/tests/environment.js'],
    testEnvironment: 'node',
    coverageDirectory: '<rootDir>/coverage',
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/__fixtures__/',
      '/__dist__/',
    ],
    testRegex: [
      '/src/.*\\.(spec).(ts|tsx|js)$',
      '/test/.*\\.(e2e-spec).(ts|tsx|js)$',
    ],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.{ts,js}',
      '!<rootDir>/src/**/index.ts',
      '!<rootDir>/src/**/*.{spec}.{ts,js}',
    ],
    coverageThreshold: {
      global: {
        "lines": 70
      }
    }
  };
  