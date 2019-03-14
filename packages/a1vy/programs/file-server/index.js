const { prompt } = require('inquirer');
const ip = require('../../lib/ip');

module.exports = async () => prompt([
	{
		name: 'host',
		message: 'On which host should the server run',
		type: 'input',
		default: ip(),
	},
	{
		name: 'port',
		message: 'On which port should the server run',
		type: 'input',
		default: '1337',
	},
	{
		name: 'base',
		message: 'Where\'s the base directory for the file',
		type: 'input',
		default: './',
	},
	{
		name: 'page',
		message: 'What\'s the default HTML page',
		type: 'input',
		default: 'index.html',
	},
	{
		name: 'delay',
		message: 'Should I delay HTML pages to simulate load time (ms)?',
		type: 'input',
		default: 0,
	},
	{
		name: 'cache',
		message: 'Serve with cache header?',
		type: 'confirm',
		default: false,
	},
])
	.then(answers => require('./service')(answers))
	.catch(error => { throw error; });
