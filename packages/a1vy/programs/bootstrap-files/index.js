const { readdir, readFile, writeFile } = require('fs').promises;
const boxt = require('boxt');
const inquirer = require('inquirer');
require('colors');

const fixFilename = file => file.replace(/^__/, '.');
const sorter = (a, b) => {
	a = fixFilename(a).toLowerCase();
	b = fixFilename(b).toLowerCase();

	return a < b ? -1 : b < a ? 1 : 0;
};

module.exports = async () => {
	const base = `${__dirname}/files`;
	const files = await readdir(base);
	const choices = await Promise.all(
		files
			.sort(sorter)
			.map(
				async item => ({
					name: fixFilename(item),
					value: item,
					checked: false,
				}),
			),
	);

	const answers = await inquirer
		.prompt([
			{
				name: 'files',
				message: 'Which files would you like me to write for you?',
				type: 'checkbox',
				pageSize: '20',
				choices,
			},
		]);

	const promises = answers.files.map(file => {
		return readFile(`${base}/${file}`)
			.then(data => writeFile(`./${fixFilename(file)}`, data))
			.then(() => fixFilename(file))
			.catch(error => {
				throw error;
			});
	});

	Promise.all(promises)
		.then(results => {
			console.log(boxt([
				'Files have been written:'.blue.bold,
				results.join(', ').yellow,
			].join('\n'), {align: 'start'}));

			process.exit();
		}).catch(error => {
			throw error;
		});

};
