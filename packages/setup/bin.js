#!/usr/bin/env node

const { resolve, join } = require('path');
const { promises: { copyFile, readdir } } = require('fs');
const { prompt } = require('inquirer');
const exist = require('@does/exist');
const exec = require('async-execute');

(async() => {
	await fixtures();
	await dependencies();
})();


async function dependencies() {
	const dir = join(__dirname, 'devDependencies');
	const devDependencies = await readdir(dir);

	while(devDependencies.length) {
		const dependency = devDependencies.pop();
		const list = require(join(dir, dependency));
		const { dependencies } = await prompt([ {
			name: 'dependencies',
			type: 'checkbox',
			message: `Pick devDependencies to install for ${dependency.split('.').shift()}`,
			choices: list.map(name => (
				{ name, value: name, checked: true }
			)),
		} ]);

		dependencies.length && await exec(
			`npm i -D ${dependencies.map(d => [ d, 'latest' ].join('@')).join(' ')}`,
			{ pipe: true },
		);
	}
}

async function fixtures() {
	const dir = join(__dirname, 'fixtures');
	const fixtures = await readdir(dir);

	while (fixtures.length) {
		const fixture = fixtures.pop();
		const target = fixture.replace(/^__/, '.');
		const source = join(dir, fixture);
		const destination = resolve(target);

		const exists = await exist(destination);

		const { answer } = await prompt([ {
			name: 'answer',
			type: 'confirm',
			message: [
				exists ? 'Override' : 'Create',
				target,
				'?',
			].join(' '),
			default: !exists,
		} ]);

		answer && await copyFile(source, destination);
	}
}
