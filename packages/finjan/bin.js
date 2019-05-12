#!/usr/bin/env node

const { join } = require('path');
const execute = require('async-execute');

const [, , ...rest] = process.argv;

execute([
	'node',
	'--experimental-modules',
	'--es-module-specifier-resolution=node',
	join(__dirname, 'bin.mjs'),
	...rest,
	'--color'
].join(' '), {
	pipe: true,
	exit: true
});
