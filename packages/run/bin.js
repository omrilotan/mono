#!/usr/bin/env node

const { resolve } = require('path');
const { prompt } = require('inquirer');
const exec = require('async-execute');
require('colors');

const {argv: [,,...rest]} = process;

(async() => {
	const { scripts } = require(resolve('.', 'package.json'));

	const choices = Object.entries(scripts).map(
		([value, content]) => ({
			name: `${value.yellow.bold}: ${content}`,
			value,
		})
	);

	const { script } = await prompt([{
		name: 'script',
		message: 'Select script to run',
		type: 'list',
		pageSize: '20',
		choices,
	}]);

	const args = rest.filter(Boolean).join(' ');

	const command = [
		'npm',
		'run',
		script,
		args ? '--' : '',
		args,
	].filter(Boolean).join(' ');

	console.log(`Executing: ${command.bold}`);
	await exec(command, {pipe: true, exit: true});
})();
