const path = require("path");

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  modulePaths: [path.resolve(__dirname, "src")],
  moduleNameMapper: {
    "^test/(.+)": "<rootDir>/test/$1"
  },
  setupFilesAfterEnv: ["./test/setup.ts"]
};
