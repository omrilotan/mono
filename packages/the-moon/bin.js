#!/usr/bin/env node

process.on('unhandledRejection', console.error);

const moon = require('.');
console.log(moon());
