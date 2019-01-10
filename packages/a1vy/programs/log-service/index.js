const inquirer = require('inquirer');

module.exports = async () => {
	inquirer
		.prompt([
			{
				name: 'host',
				message: 'Hostname or IP',
				type: 'input',
				default: '127.0.0.1',
			},
			{
				name: 'port',
				message: 'Port number',
				type: 'input',
				default: '1337',
			},
		])
		.then(answers => require('./program')(answers))
		.catch(error => {
			throw error;
		});
};
