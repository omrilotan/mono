const inquirer = require('inquirer');
const execute = require('async-execute');
require('colors');

process.on('unhandledRejection', console.error);

module.exports = async() => {
	let aliases = require('./aliases');
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
					key = `${key} [☠️ ]`;
				} else {
					desc = desc.bold;
				}

				return {key, desc, value};
			}
		)
	;

	const choices = aliases
		.map(
			({key, desc, value}) => ({
				name: `${key.yellow.bold}: ${desc}`,
				value: [key, value],
				checked: false,
			})
	);

	const answers = await inquirer
		.prompt([
			{
				name: 'aliases',
				message: [
					'Which git aliases would you like me to set for you?',
					'[☠️ ] marks an alias you have with a different value'.dim,
				].join('\n'),
				type: 'checkbox',
				pageSize: '20',
				choices,
			},
		]);

	await Promise.all(
		answers.aliases.map(
			([key, value]) => execute(`git config --global alias.${key} '${value}'`)
		)
	)
}
