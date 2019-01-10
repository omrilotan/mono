const inquirer = require('inquirer');

module.exports = async () => {
	inquirer
		.prompt([
			{
				name: 'url',
				message: 'Web URL',
				type: 'input',
				default: 'http://127.0.0.1:80',
			},
			{
				name: 'times_s',
				message: 'How many concurrencies?',
				type: 'input',
				default: '5',
			},
			{
				name: 'delay_s',
				message: 'Delay between requests in a concurrency (ms)',
				type: 'input',
				default: '200',
			},
		])
		.then(answers => require('./service')(answers))
		.catch(error => {
			console.error(error);
			throw error;
		});
};
