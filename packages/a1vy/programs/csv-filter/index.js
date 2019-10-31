const { resolve } = require('path');
const { promises: { readFile, writeFile, readdir } } = require('fs');
const { prompt } = require('inquirer');
const exist = require('@does/exist');

module.exports = async function filterCSV() {
	const { file } = await prompt([
		{
			name: 'file',
			message: 'Path to file (enter to get list of files in current directory)',
			type: 'input',
		},
	]);

	let path = file && resolve(file);

	if (!(await exist(path))) {
		console.log(`Could not find file "${path}"`);

		const choices = await readdir(process.cwd());

		const { file } = await prompt([
			{
				name: 'file',
				message: 'Select file',
				type: 'list',
				pageSize: '20',
				choices,
			},
		]);

		path = resolve(file);
	}
	const lines = (await readFile(path)).toString().split('\n');

	const [ titles ] = lines;

	const { fields } = await prompt([
		{
			name: 'fields',
			message: 'Select fields to leave in',
			type: 'checkbox',
			pageSize: '20',
			choices: titles.split(',').map((name, value) => ({name, value})),
		},
	]);

	const content = lines.map(
		line => line.split(',').filter(
			(_, index) => fields.includes(index),
		).join(','),
	).join('\n');

	await writeFile(
		path,
		content,
	);
};
