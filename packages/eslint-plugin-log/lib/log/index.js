const { yellow } = require('chalk');
const mark = require('../mark');
const base = process.cwd();
let count = 0;
let timer;
const scanned = [];

/**
 * Log each filename to console before processing
 * @param  {Array[]} messages Lint error messages
 * @param  {String}  filename File name
 * @return {Array}           First messages array
 */
module.exports = function([messages = []] = [], filename) {
	clearTimeout(timer);

	if (scanned.includes(filename)) {
		return messages;
	}
	scanned.push(filename);

	const [color, check] = mark(messages);

	/* eslint-disable no-console */
	count === 0 && console.log('Linting:');
	console.log(
		[
			`${++count}.`,
			color(check),
			filename.replace(base, ''),
		].join(' ')
	);

	timer = setTimeout(
		() => console.log(
			yellow.bold(`\n${count} files linted.`)
		),
		40
	);
	/* eslint-enable no-console */

	return messages;
};
