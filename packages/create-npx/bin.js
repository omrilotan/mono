#!/usr/bin/env node

const { writeFile } = require('fs').promises
const { resolve } = require('path');
const { prompt } = require('inquirer');
const git = require('async-git');
const exist = require('@does/exist');

(async () => {
	const answers = await prompt([
		{
			type: 'input',
			name: 'bin',
			message: 'Local path to your executable file',
			default: 'main.go',
		},
		{
			type: 'input',
			name: 'name',
			message: 'Your package name',
			default: await git.name,
			validate: value => !!value || 'This is a required field',
		},
		{
			type: 'input',
			name: 'author',
			message: 'Your name',
			default: await git.author,
		},
		{
			type: 'input',
			name: 'description',
			message: 'Your package description',
		},
		{
			type: 'input',
			name: 'version',
			message: 'Your package version',
			default: '1.0.0',
		},
		{
			type: 'input',
			name: 'license',
			message: 'Your software license',
			default: 'UNLICENCED',
		},
	]);

	writeFile(
		resolve('package.json'),
		JSON.stringify(
			Object.entries(answers).reduce(
				(accumulator, [key, value]) => value
					? Object.assign(
						accumulator,
						{[key]: value}
					)
					: accumulator,
				{}
			),
			null,
			2
		)
	);

	writeFile(
		resolve('.npmignore'),
		`.*\n*\n!${answers.bin}`
	);

	if (!(await exist(resolve('readme.md')))) {
		writeFile(
			resolve('readme.md'),
			[
				`# ${answers.name}`,
				answers.description ? `## ${answers.description}` : '',
				'run:',
				'```',
				`npx ${answers.name}`,
				'```',
			].join('\n')
		);
	}
})();
