#!/usr/bin/env node

const fs = require('fs');
const { promisify } = require('util');
const boxt = require('boxt');
require('colors');

(async () => {
	try {
		const pkg = await promisify(fs.readFile)('./package.json');
		const {name, version} = JSON.parse(pkg.toString());

		console.log( // eslint-disable-line no-console
			`Checking for versions of ${name} that are newer than ${version}`
		);

		const required = await require('./lib/start')({
			immediate: true,
			name,
			version,
		});

		if (required) {
			return;
		}

		console.log( // eslint-disable-line no-console
			boxt(
				`${name.bold} already is the latest version (${version.dim})`
			)
		);
	} catch (error) {
		console.error(error);  // eslint-disable-line no-console
		throw error;
	}
})();
