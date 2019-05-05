const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  resolver: "jest-pnp-resolver",
  setupFiles: [
    "react-app-polyfill/jsdom"
  ],
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
    "<rootDir>/tests/unit/setup.js"
  ],
  testMatch: [
    "<rootDir>/tests/unit/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  watchPlugins: [
    "/Users/adrian/Repos/todoapp/web/node_modules/jest-watch-typeahead/filename.js",
    "/Users/adrian/Repos/todoapp/web/node_modules/jest-watch-typeahead/testname.js"
  ]
}