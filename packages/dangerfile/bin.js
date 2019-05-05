#!/usr/bin/env node

const { promises: { readFile, writeFile } } = require('fs');
const { join } = require('path');
const execute = require('async-execute');
const exist = require('@does/exist');
const FILENAME = 'dangerfile.js';

(async() => {
	const target = join(process.cwd(), FILENAME);

	if (await exist(target)) {
		console.warn('Using the existing Dangerfile');
	} else {
		console.info('Creating a new Dangerfile');
		const source = join(__dirname, FILENAME);
		const content = await readFile(source);
		writeFile(target, content.toString());
	}

	try {
		await execute('./node_modules/.bin/danger ci', { pipe: true });
	} catch (error) {
		try {
			console.info('Installing danger');
			await execute('npm i danger --no-save', { pipe: true });
			await execute('./node_modules/.bin/danger ci', { pipe: true });
		} catch (error) {
			console.error(error);
			process.exit(1);
		}
	}
})();
