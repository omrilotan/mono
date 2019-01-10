const inquirer = require('inquirer');

module.exports = async () => {
	inquirer
		.prompt([
			{
				name: 'from',
				message: 'From address',
				type: 'input',
				default: '127.0.0.1:80',
			},
			{
				name: 'to',
				message: 'To address',
				type: 'input',
				default: '127.0.0.1:3000',
			},
		])
		.then(answers => require('./service')(answers))
		.catch(error => {
			console.error(error);
			throw error;
		});
};
