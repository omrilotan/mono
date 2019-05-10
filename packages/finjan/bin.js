#!/usr/bin/env node

const exec = require('async-execute');
const { join } = require('path');

(async() => {
	const [, , ...rest] = process.argv;

	await exec(
		`node --experimental-modules ${join(__dirname, 'index.mjs')} ${rest.join(' ')} --color`,
		{
			pipe: true,
			exit: true,
		}
	);
})();
