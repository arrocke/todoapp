'use strict';

// Set the environment.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Terminate on error.
process.on('unhandledRejection', err => {
  throw err;
});

// Load environment variables.
require('../config/env');

const jest = require('jest');
const path = require('path');
let argv = process.argv.slice(2);

// Watch unless on CI, in coverage mode, explicitly adding `--no-watch`,
// or explicitly running all tests
if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--no-watch') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  argv.push('--watch');
}

// Remove the --no-watch option since it is not used by Jest.
if (argv.indexOf('--no-watch') !== -1) {
  argv = argv.filter(arg => arg !== '--no-watch');
}

argv.push("--config", path.resolve(__dirname, '../config/jest/jest.config.js'));

jest.run(argv);
