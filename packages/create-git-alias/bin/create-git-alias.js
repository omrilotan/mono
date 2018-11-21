#!/usr/bin/env node

process.on('unhandledRejection', console.error); // eslint-disable-line no-console

require('../')();
