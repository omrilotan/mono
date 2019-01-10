const { promisify } = require('util');
const read = promisify(require('fs').readFile);
const random = require('../random');

module.exports = async () => {
	const file = await read(`${__dirname}/greetings.txt`);
	const greetings = file.toString().split('\n').filter(item => !!item && !item.startsWith('#'));

	return random(greetings);
}
