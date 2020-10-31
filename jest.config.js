module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/pkg'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/index.{js,jsx,ts,tsx}'],
}
