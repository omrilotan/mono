const inquirer = require('inquirer');

module.exports = async () => {
	inquirer
		.prompt([
			{
				name: 'host',
				message: 'On which host should the server run',
				type: 'input',
				default: '127.0.0.1',
			},
			{
				name: 'port',
				message: 'On which port should the server run',
				type: 'input',
				default: '1337',
			},
		])
		.then(answers => require('./service')(answers))
		.catch(error => {
			throw error;
		});
};
