#!/usr/bin/env node

const { resolve } = require('path');
const exec = require('async-execute');

(async() => {
	const { name, version } = require(resolve('./package.json'));

	process.stdout.write(`Check if ${name}@${version} was already published...`);
	const exists = await exec(`npm view ${name}@${version} version`);

	if (exists) {
		process.stdout.write(' ...yup\n');
		return;
	}

	process.stdout.write('\n');
	await exec('npm publish', { pipe: true });
})();
