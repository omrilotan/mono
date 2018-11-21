#!/usr/bin/env node

process.on('unhandledRejection', console.error);

(async() => console.log(await require('../')()))();

