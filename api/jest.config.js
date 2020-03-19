const path = require("path");

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleDirectories: [
    path.resolve(__dirname, "node_modules"),
    path.resolve(__dirname, "src")
  ]
};
