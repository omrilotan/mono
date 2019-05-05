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
		await execute('npm i -g danger');
		await execute('danger ci', { pipe: true });
	}
})();
