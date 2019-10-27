require('colors');
const {resolve} = require('path');
const {prompt} = require('inquirer');
const exec = require('async-execute');

module.exports = async() => {
	const {scripts} = require(resolve('.', 'package.json'));

	const choices = Object.entries(scripts).map(
		([value, content]) => ({
			name: `${value.yellow.bold}: ${content}`,
			value,
		}),
	);

	const {script, args} = await prompt([
		{
			name: 'script',
			message: 'Select script to run',
			type: 'list',
			pageSize: '20',
			choices,
		},
		{
			name: 'args',
			message: 'Add an args string (optional)',
			type: 'input',
		},
	]);

	const command = [
		'npm',
		'run',
		script,
		args ? `-- ${args}` : '',
	].filter(Boolean).join(' ');

	console.log(`Executing: ${command.bold}`);
	await exec(command, {pipe: true});
};
