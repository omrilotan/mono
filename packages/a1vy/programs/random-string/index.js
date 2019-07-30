const inquirer = require('inquirer');

let length = 7;

module.exports = async () => {
	inquirer
		.prompt([
			{
				name: 'length',
				message: 'How long do you want this string?',
				type: 'input',
				default: length,
			},
		])
		.then(answers => {
			length = answers.length;

			require('./service')(answers);
		})
		.catch(error => {
			console.error(error);
			throw error;
		});
};
