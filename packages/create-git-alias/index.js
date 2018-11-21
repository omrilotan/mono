const inquirer = require('inquirer');
const execute = require('async-execute');
require('colors');

module.exports = async() => {
	let aliases = require('./aliases');
	let hazard = false;
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
			({key, value}) => existing[key] !== value
		)

		// Warn about existing but different
		.map(
			({key, desc, value}) => {
				if (existing[key]) {
					hazard = true;
					desc = `[☠️ ] ${desc}`;
				}

				return {key, desc, value};
			}
		)
	;

	if (!aliases.length) {
		return 'We\'re a perfect match 😍! All of our aliases are identical';
	}

	const choices = aliases
		.map(
			({key, desc, value}) => ({
				name: `${key.yellow.bold}: ${desc}`,
				value: [key, value],
				checked: false,
			})
		);

	const message = ['Which git aliases would you like me to set for you?'];
	hazard && message.push('[☠️ ] marks an alias you have with a different value'.dim);

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

	try {
		await Promise.all(
			answers.aliases.map(
				([key, value]) => execute(`git config --global alias.${key} '${value}'`)
			)
		);
	} catch (error) {
		throw error;
	}

	switch (answers.aliases.length) {
		case 0:
			return 'I\'ve set up no aliases for you today 😕';
		case 1:
			return `I've set up the alias ${answers.aliases[0][0].bold} for you 😉`;
		default:
			return `I've set up these aliases for you: ${answers.aliases.map(([key]) => key).join(', ').bold} 😃`;
	}
}
