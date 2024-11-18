module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.d.{ts,tsx}',
    '!src/service/*.{ts,tsx}',
    '!src/App.{ts,tsx}',
    '!src/utils/*.{ts,tsx}',
    '!src/index.{ts,tsx}',
    '!src/theme/**',
    '!src/SetupTests.ts',
    '!src/strings/*.{ts,tsx}',
    '!src/pages/FileViewerPage/index.{ts,tsx}'
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|gif|pdf)$':
      'jest-transform-stub'
  },
  clearMocks: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/coverage'],
  transformIgnorePatterns: ['/node_modules/(?!react-toastify/).+\\.css$'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@assets/(.*)$': '<rootDir>/public/assests/$1'
  }
};
