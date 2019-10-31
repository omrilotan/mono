#!/usr/bin/env node

require('colors');
const { readdir } = require('fs').promises;
const inquirer = require('inquirer');
const { clear } = require('stdline');
const sortby = require('@does/sortby');
const wait = require('@lets/wait');
const greet = require('./lib/greet');

const sortByNameCaseInsensitive = (...array) => sortby(
	array,
	'name',
	{
		modify: a => a.toLowerCase(),
	},
);

module.exports = async function a1vy() {
	process.on('unhandledRejection', console.error);

	init();

	require('upgradable')(require('./package.json'));
};

async function init() {
	await wait(); // wait until after current logs are written (fs promises)
	clear();

	await greet();

	const programs = await readdir(`${__dirname}/programs`);

	const choices = programs.reduce(
		(choices, value) => {
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
		},
		[],
	).sort(sortByNameCaseInsensitive);

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
}
