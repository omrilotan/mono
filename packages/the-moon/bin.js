#!/usr/bin/env node

process.on('unhandledRejection', console.error);

const moon = require('.');
const str = (content, length) => new Array(length + 1).join(content);
const name = moon({format: 'name'});
const icon = moon();
const length = name.length;
const half1 = Math.floor(length / 2);
const half2 = Math.ceil(length / 2);

console.log(`
╭─${str('─', length)}─╮
│ ${name} │
├─${str('─', length)}─┤
│ ${str(' ', length)} │
│${str(' ', half1)}${icon} ${str(' ', half2)}│
│ ${str(' ', length)} │
╰─${str('─', length)}─╯
`);
