const base = process.cwd();
let count = 0;
let timer;

/**
 * Log each filename to console before processing
 * @param  {String} text     File content
 * @param  {String} filename File name
 * @return {Array}           Array of strings to lint
 */
module.exports = function(text, filename) {
	clearTimeout(timer);

	/* eslint-disable no-console */
	count === 0 && console.log('Linting:');
	console.log(
		[
			++count,
			filename.replace(base, ''),
		].join('. ')
	);
	timer = setTimeout(() => console.log(`\n${count} files linted.`), 40);
	/* eslint-enable no-console */

	return [text];
};
