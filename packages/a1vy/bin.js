#!/usr/bin/env node

process.env.ROOT = __dirname;

require('colors');
const { readdir } = require('fs');
const { promisify } = require('util');
const ls = promisify(readdir);
const inquirer = require('inquirer');
const { clear } = require('./lib/terminal');
const greet = require('./lib/greet');

clear();

process.on('unhandledRejection', console.error);

try {
	init();
} catch (error) {
	throw error;
}

async function init() {
	await greet();

	const programs = await ls(`${__dirname}/programs`);

	const choices = programs.reduce((choices, value) => {
		if (value.startsWith('.')) {
			return choices;
		}

		const {
			name,
			desc,
		} = require(`./programs/${value}/details.json`);

		choices.push({
			name: `${name.bold} - ${desc}`,
			value,
		});

		return choices;
	}, []).sort(caseInsensitiveSortByName);

	try {
		const answers = await inquirer
			.prompt([
				{
					name: 'service',
					message: 'Select Service',
					type: 'list',
					pageSize: '20',
					choices,
				},
			]);

		await require(`./programs/${answers.service}`)();
	} catch (error) {
		throw error;
	}
}

function caseInsensitiveSortByName(a, b) {
	if (a.name.toLowerCase() < b.name.toLowerCase()) {
		return -1;
	}

	if (a.name.toLowerCase() > b.name.toLowerCase()) {
		return 1;
	}

	return 0;
}

require('upgradable')(require('./package.json'));
