#!/usr/bin/env node

process.on('unhandledRejection', console.error);

const inquirer = require('inquirer');
const execute = require('async-execute');
require('colors');

const OPTION_SHOW_ALL = ['all', 'show-all'];
const opts = require('./lib/opts')(process.argv);

const hasOption = options => options.some(opt => opts.includes(opt));

(
	async() => console.log(await app())
)();

async function app() {
	let aliases = require('./aliases');
	let match = false;
	let hazard = false;
	const showAll = hasOption(OPTION_SHOW_ALL);
	const bulk = await execute('git config -l | grep alias | cut -c 7-');
	const existing = bulk
		.split('\n')
		.filter(Boolean)
		.reduce(
			(accumulator, line) => {
				const [key, ...value] = line.split('=');

				return Object.assign(accumulator, {[key]: value.join('=')});
			},
			{}
		);

	aliases = aliases

		// Filter out existing and identical
		.filter(
			({key, value}) => showAll || existing[key] !== value
		)

		// Warn about existing but different
		.map(
			({key, desc, value, disabled = false}) => {
				if (existing[key] === value) {
					match = true;
					disabled = true;
					desc = `[🎀 ] ${desc}`;
				} else if (existing[key]) {
					hazard = true;
					desc = `[☠️ ] ${desc}`;
				}

				return {key, desc, value, disabled};
			}
		)
	;

	if (!aliases.length) {
		return 'We\'re a perfect match 😍! All of our aliases are identical';
	}

	const choices = aliases
		.map(
			({key, desc, value, disabled}) => ({
				name: `${key.yellow.bold}: ${desc}`,
				value: [key, value],
				checked: false,
				disabled,
			})
		);

	const message = ['Which git aliases would you like me to set for you?'];
	hazard && message.push('[☠️ ] marks an alias you have with a different value'.dim);
	match && message.push('[🎀️ ] marks an alias you have with the same value'.dim);
	message.push('\t');

	const answers = await inquirer
		.prompt([
			{
				name: 'aliases',
				message: message.join('\n'),
				type: 'checkbox',
				pageSize: '20',
				choices,
			},
		]);

	const selected = [...answers.aliases];

	while (answers.aliases.length) {
		const [key, value] = answers.aliases.shift();
		await execute(`git config --global alias.${key} '${value}'`);
	}

	switch (selected.length) {
		case 0:
			return 'I\'ve set up no aliases for you today 😕';
		case 1:
			return `I've set up the alias "${selected[0][0].bold}" for you 😉`;
		default:
			return `I've set up these aliases for you: ${selected.map(([key]) => `"${key.bold}"`).join(', ')} 😃`;
	}
}
