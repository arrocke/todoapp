module.exports = {
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  collectCoverageFrom: ["**/src/**/*!(.{test,spec}).{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: ["/node_modules/"]
};
