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
		await execute('danger ci', { pipe: true });
	} catch (error) {
		if (error.code === 'MODULE_NOT_FOUND') {
			await execute('npm i danger --no-save');
			await execute('danger ci', { pipe: true });
		} else {
			console.error(error);
			process.exit(1);
		}
	}
})();
