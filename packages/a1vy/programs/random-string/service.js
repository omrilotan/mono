const inquirer = require('inquirer');
require('colors');

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = LOWERCASE.toUpperCase();
const NUMBERS = '0123456789';
const letters = LOWERCASE + UPPERCASE;
const possible = letters + NUMBERS;

module.exports = async ({length = 7}) => {
	const results = [];

	while(length--) {
		const use = results.length ? possible : letters;

		results.push(
			use.charAt(
				Math.floor(Math.random() * use.length),
			),
		);
	}

	console.log(results.join('').yellow.bold);
	another();
};

function another() {
	inquirer
		.prompt([
			{
				name: 'another',
				message: 'Another one?',
				type: 'confirm',
				default: false,
			},
		])
		.then(({another}) => another && require('./')())
		.catch(error => {
			console.error(error);
			throw error;
		});
}
