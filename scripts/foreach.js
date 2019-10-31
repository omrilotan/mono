#!/usr/bin/env node

process.on('unhandledRejection', error => { throw error; });

const {readdir} = require('fs').promises;
const {resolve} = require('path');
const execute = require('../packages/async-execute');

const {argv} = process;
argv.shift();
argv.shift();

const [command] = argv;


(async() => {
	const packages = await readdir('packages');

	console.log(`Executing on ${packages.length} packages:`);

	console.log(
		(await Promise.all(
			packages
				.filter(item =>
					!item.startsWith('.'),
				)
				.map(pkg =>
					execute(
						[
							'cd',
							resolve(__dirname, '../', 'packages', pkg),
							'&&',
							command,
						].join(' '),
						{
							pipe: true,
						},
					),
				),
		)).join('\n'),
	);
})();
