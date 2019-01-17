const { readFile } = require('fs').promises;
const { resolve } = require('path');
const random = require('doamrn');

module.exports = async () => {
	const file = await readFile(resolve(__dirname, 'greetings.txt'));
	const greetings = file.toString().split('\n').filter(item => !!item && !item.startsWith('#'));

	return random(...greetings);
}
