const { prompt } = require('inquirer');
const ip = require('../../lib/ip');

module.exports = async () => {
	prompt([
		{
			name: 'host',
			message: 'Hostname or IP',
			type: 'input',
			default: ip(),
		},
		{
			name: 'port',
			message: 'Port number',
			type: 'input',
			default: '2003',
		},
		{
			name: 'encoding',
			message: 'Message encoding ()',
			type: 'list',
			default: 'utf8',
			choices: [
				{name: 'utf8'},
				{name: 'ascii'},
				{name: 'binary'},
				{name: 'latin1'},
				{name: 'ucs2 (alias of utf16le)', value: 'ucs2'},
				{name: 'utf16le'},
				{name: 'hex'},
				{name: 'base64'},
			],
		},
	])
		.then(answers => require('./service')(answers))
		.catch(error => {
			throw error;
		});
};
