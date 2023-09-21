const config = {
  verbose: true,
  transform: {
    "^.*\\.(ts|tsx)$": "ts-jest",
  },
  rootDir: ".",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/test/jest-setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
};

export default config;
